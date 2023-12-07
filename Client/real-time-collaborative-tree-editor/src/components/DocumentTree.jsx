import { useState, useEffect } from 'react';
import axios from '../services/api';

const DocumentTree = () => {
  const [documentNodes, setDocumentNodes] = useState([]);
  const [newNodeContent, setNewNodeContent] = useState('');
  const [editNodeId, setEditNodeId] = useState(null);
  const [editedNodeContent, setEditedNodeContent] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get('/document');
        setDocumentNodes(response.data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, [documentNodes]);

  const handleAddNode = async (parentId) => {
    try {
      const response = await axios.post('/document/addNode', {
        parentId,
        content: newNodeContent,
      });

      setDocumentNodes([...documentNodes, response.data]);
      setNewNodeContent('');
    } catch (error) {
      console.error('Error adding node:', error);
    }
  };

  const handleEditNode = async (nodeId) => {
    try {
      await axios.put(`/document/editNode/${nodeId}`, { content: editedNodeContent });
      const updatedNodes = documentNodes.map((node) =>
        node.node_id === nodeId ? { ...node, content: editedNodeContent } : node
      );
      setDocumentNodes(updatedNodes);
      setEditNodeId(null);
      setEditedNodeContent('');
    } catch (error) {
      console.error('Error editing node:', error);
    }
  };

  const handleDeleteNode = async (nodeId) => {
    try {
      await axios.delete(`/document/deleteNode/${nodeId}`);
      const updatedNodes = documentNodes.filter((node) => node.node_id !== nodeId);
      setDocumentNodes(updatedNodes);
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  const renderTree = (nodes, parentId = null) => {
    return (
      <ul>
        {nodes
          .filter((node) => node.parent_id === parentId)
          .map((node) => (
            <li key={node.node_id}>
              <span className="nodeValue">
                {editNodeId === node.node_id ? (
                  <input
                    type="text"
                    value={editedNodeContent}
                    onChange={(e) => setEditedNodeContent(e.target.value)}
                  />
                ) : (
                  node.content
                )}{' '}
                {/* (ParentId: {node.parent_id}, NodeId: {node.node_id}) */}
              </span>
              {editNodeId !== node.node_id && (
                <>
                  <button onClick={() => setEditNodeId(node.node_id)}>Edit</button>
                  <button onClick={() => handleDeleteNode(node.node_id)}>Delete</button>
                  <button onClick={() => handleAddNode(node.node_id)}>Add Child Node</button>
                </>
              )}
              {renderTree(nodes, node.node_id)}
              {editNodeId === node.node_id && (
                <button onClick={() => handleEditNode(node.node_id)}>Save</button>
              )}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Document Tree</h2>
      {(documentNodes != null && documentNodes.length > 0) && renderTree(documentNodes)}
      <div>
        <input
          type="text"
          placeholder="New Node Content"
          value={newNodeContent}
          onChange={(e) => setNewNodeContent(e.target.value)}
        />
        <button onClick={() => handleAddNode(null)}>Add Root Node</button>
      </div>
    </div>
  );
};

export default DocumentTree;
