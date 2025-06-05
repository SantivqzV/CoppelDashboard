"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { fetchOperators, fetchColor, deleteOperator } from "@/Constants/operators";
import { Button } from "@components/ui/button";
import axios from "axios";

// Define a type for Operator
interface Operator {
  id: string;
  name: string;
  username: string;
  color_hex?: string;
  color_index?: number;
}

function EditOperatorModal({ operator, onClose }: { operator: Operator; onClose: () => void }) {
  const colorOptions = [
    "#000000", "#FF5733", "#33C1FF", "#33FF57", "#FFC300", "#A633FF", "#FF33A8"
  ];

  const [selectedColor, setSelectedColor] = useState(operator?.color_hex ?? colorOptions[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingColor, setLoadingColor] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function getColor() {
      setLoadingColor(true);
      if (!operator?.username) {
        setLoadingColor(false);
        return;
      }
      try {
        const res = await fetchColor(operator.username);
        if (!ignore && res?.color_hex) {
          setSelectedColor(res.color_hex);
        }
      } catch {
        setSelectedColor(operator?.color_hex ?? colorOptions[0]);
      }
      setLoadingColor(false);
      setShowDropdown(false);
    }
    getColor();
    return () => { ignore = true; };
  }, [operator, colorOptions]);

  if (!operator) return null;

  if (loadingColor) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-black rounded-lg shadow-lg p-6 min-w-[300px] flex items-center justify-center">
          <span className="text-white">Loading...</span>
        </div>
      </div>
    );
  }

  const handleClose = async () => {
    setLoading(true);
    try {
      const color_index = colorOptions.indexOf(selectedColor);
      await axios.patch(`https://server-zzcb.onrender.com/update-color`, {
        username: operator.username,
        color_hex: selectedColor,
        color_index,
      });
    } catch {
      // Error intentionally ignored
    }
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-black rounded-lg shadow-lg p-6 min-w-[300px]">
        <h2 className="text-lg font-bold mb-4 text-white">Edit Operator</h2>
        <div className="mb-2 text-white">
          <span className="font-semibold">Name:</span> {operator.name}
        </div>
        <div className="mb-2 text-white">
          <span className="font-semibold">Assigned Color:</span>
          <div className="relative inline-block ml-2">
            <button
              className="w-8 h-8 rounded-full border-2 border-white"
              style={{ background: selectedColor }}
              tabIndex={0}
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div className="absolute mt-2 bg-white rounded shadow-lg z-10">
                <div className="flex gap-2 p-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 focus:outline-none"
                      style={{ background: color }}
                      onClick={() => {
                        setSelectedColor(color);
                        setShowDropdown(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-2 text-white">
          <span className="font-semibold">Color Hex:</span> {selectedColor}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {loading ? "Saving..." : "Close"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const CardList = ({ title }: { title: string }) => {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [selected, setSelected] = useState<Operator | null>(null);
  const [deleteUser, setDeleteUser] = useState<Operator | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
  fetchOperators().then((result) => {
    setOperators(
      result.map((item: any) => ({
        id: item.id,
        name: item.name,
        username: item.username ?? "", // fallback if missing
        color_hex: item.color_hex,
        color_index: item.color_index,
      }))
    );
  });
}, []);

  const handleDelete = async () => {
    if (!deleteUser) return;
    setDeleteLoading(true);
    try {
      await deleteOperator(deleteUser.username);
      window.location.reload(); // Or refetch operators if you want to avoid full reload
    } catch {
      alert("Failed to delete user.");
    }
    setDeleteLoading(false);
    setDeleteUser(null);
  };

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {operators.map((item) => (
          <Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              <Badge variant="secondary">ID: {item.id}</Badge>
            </CardContent>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelected(item)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setDeleteUser(item)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Only render modal if selected is not null */}
      {selected && (
        <EditOperatorModal operator={selected} onClose={() => setSelected(null)} />
      )}

      {/* Delete confirmation modal */}
      {deleteUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-black rounded-lg shadow-lg p-6 min-w-[300px]">
            <h2 className="text-lg font-bold mb-4">Delete User</h2>
            <p className="mb-4">
              Are you sure you want to delete <span className="font-semibold">{deleteUser.name}</span>?
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteUser(null)} disabled={deleteLoading}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;