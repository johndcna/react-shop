import React, { useEffect, useState } from "react";
import { getOwners, createOwner, updateOwner, deleteOwner } from "../../service/ownerService";
import Button from "../../Button.js";
import Input from "../../Input.js"; // Import Input component
import Loader from "../../Loader.js"; // Import Loader component
import "./Owners.css"; // Import the CSS file for Owners

const Owners = () => {
  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({ name: "", id: null });
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await getOwners();
      setOwners(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    } finally {
      setLoading(false); // Set loading to false when fetching is complete
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateOwner(form.id, { name: form.name });
      } else {
        await createOwner({ name: form.name });
      }
      setForm({ name: "", id: null });
      fetchOwners();
    } catch (error) {
      console.error("Error saving owner:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOwner(id); // Send the id as ownerId
      console.log(`Owner with ID ${id} deleted successfully.`);
      fetchOwners(); // Refresh the owner list
    } catch (error) {
      console.error("Error deleting owner:", error);
    }
  };

  const handleEdit = (owner) => {
    setForm({ name: owner.name, id: owner.id });
  };

  return (
    <div>
      <h1>Owners</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Owner Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Button type="submit">{form.id ? "Update" : "Add"}</Button>
      </form>

      {/* Show Loader while fetching owners */}
      {loading ? (
        <Loader />
      ) : (
        <div className="owners-container">
          {owners.map((owner) => (
            <div key={owner.id} className="owner-box">
              <div className="owner-info">
                <strong>ID:</strong> {owner.id} <br />
                <strong>Name:</strong> {owner.name}
              </div>
              <div className="owner-actions">
                <Button outline onClick={() => handleEdit(owner)}>
                  Edit
                </Button>
                <Button outline onClick={() => handleDelete(owner.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Owners;
