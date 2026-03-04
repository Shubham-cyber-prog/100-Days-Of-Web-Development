import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GripVertical, Pencil, Trash2, Plus } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";
import { FirewallRule } from "../types";

const ItemType = "RULE";

interface DraggableRuleProps {
  rule: FirewallRule;
  index: number;
  moveRule: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableRule({ rule, index, moveRule }: DraggableRuleProps) {
  const { toggleRule, deleteRule, updateRule } = useSimulation();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(rule);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveRule(item.index, index);
        item.index = index;
      }
    },
  });

  const handleSave = () => {
    updateRule(rule.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(rule);
    setIsEditing(false);
  };

  return (
    <tr
      ref={(node) => drag(drop(node))}
      className={`border-b border-slate-800 ${isDragging ? "opacity-50" : ""} ${
        !rule.enabled ? "opacity-40" : ""
      }`}
    >
      <td className="px-4 py-3">
        <GripVertical className="w-4 h-4 text-slate-600 cursor-move" />
      </td>
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={rule.enabled}
          onChange={() => toggleRule(rule.id)}
          className="w-4 h-4 rounded border-slate-600 bg-slate-800"
        />
      </td>
      <td className="px-4 py-3">
        <span className="font-mono text-xs text-slate-400">{rule.priority}</span>
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <input
            type="text"
            value={editData.sourceIP}
            onChange={(e) => setEditData({ ...editData, sourceIP: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs font-mono"
          />
        ) : (
          <span className="font-mono text-xs text-slate-300">{rule.sourceIP}</span>
        )}
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <input
            type="text"
            value={editData.destinationIP}
            onChange={(e) => setEditData({ ...editData, destinationIP: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs font-mono"
          />
        ) : (
          <span className="font-mono text-xs text-slate-300">{rule.destinationIP}</span>
        )}
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <input
            type="text"
            value={editData.port}
            onChange={(e) => setEditData({ ...editData, port: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs font-mono"
          />
        ) : (
          <span className="font-mono text-xs text-slate-300">{rule.port}</span>
        )}
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <select
            value={editData.protocol}
            onChange={(e) => setEditData({ ...editData, protocol: e.target.value as any })}
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs"
          >
            <option value="TCP">TCP</option>
            <option value="UDP">UDP</option>
            <option value="ICMP">ICMP</option>
            <option value="HTTP">HTTP</option>
            <option value="HTTPS">HTTPS</option>
          </select>
        ) : (
          <span className="text-xs text-blue-400">{rule.protocol}</span>
        )}
      </td>
      <td className="px-4 py-3">
        {isEditing ? (
          <select
            value={editData.action}
            onChange={(e) => setEditData({ ...editData, action: e.target.value as any })}
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs"
          >
            <option value="allow">Allow</option>
            <option value="deny">Deny</option>
          </select>
        ) : (
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              rule.action === "allow"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {rule.action.toUpperCase()}
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-2 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded hover:bg-green-500/20"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded hover:bg-slate-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteRule(rule.id)}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export function FirewallRulesTable({ compact = false }: { compact?: boolean }) {
  const { rules, reorderRules, addRule } = useSimulation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRule, setNewRule] = useState({
    sourceIP: "",
    destinationIP: "",
    port: "",
    protocol: "TCP" as const,
    action: "allow" as const,
  });

  const moveRule = (dragIndex: number, hoverIndex: number) => {
    const draggedRule = rules[dragIndex];
    const newRules = [...rules];
    newRules.splice(dragIndex, 1);
    newRules.splice(hoverIndex, 0, draggedRule);
    reorderRules(newRules);
  };

  const handleAddRule = () => {
    const rule: FirewallRule = {
      id: `rule-${Date.now()}`,
      ...newRule,
      priority: rules.length + 1,
      enabled: true,
    };
    addRule(rule);
    setNewRule({
      sourceIP: "",
      destinationIP: "",
      port: "",
      protocol: "TCP",
      action: "allow",
    });
    setShowAddForm(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-slate-900 rounded-lg border border-slate-800">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-slate-200">Firewall Rules</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Rule
          </button>
        </div>

        {showAddForm && (
          <div className="p-4 bg-slate-950 border-b border-slate-800">
            <div className="grid grid-cols-6 gap-3">
              <input
                type="text"
                placeholder="Source IP"
                value={newRule.sourceIP}
                onChange={(e) => setNewRule({ ...newRule, sourceIP: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm font-mono"
              />
              <input
                type="text"
                placeholder="Dest IP"
                value={newRule.destinationIP}
                onChange={(e) => setNewRule({ ...newRule, destinationIP: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm font-mono"
              />
              <input
                type="text"
                placeholder="Port"
                value={newRule.port}
                onChange={(e) => setNewRule({ ...newRule, port: e.target.value })}
                className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm font-mono"
              />
              <select
                value={newRule.protocol}
                onChange={(e) => setNewRule({ ...newRule, protocol: e.target.value as any })}
                className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
              >
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
                <option value="ICMP">ICMP</option>
                <option value="HTTP">HTTP</option>
                <option value="HTTPS">HTTPS</option>
              </select>
              <select
                value={newRule.action}
                onChange={(e) => setNewRule({ ...newRule, action: e.target.value as any })}
                className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
              >
                <option value="allow">Allow</option>
                <option value="deny">Deny</option>
              </select>
              <button
                onClick={handleAddRule}
                className="bg-green-500/10 text-green-400 border border-green-500/20 rounded hover:bg-green-500/20 text-sm"
              >
                Create
              </button>
            </div>
          </div>
        )}

        <div className={`overflow-auto ${compact ? "max-h-64" : "max-h-96"}`}>
          <table className="w-full">
            <thead className="bg-slate-950 sticky top-0">
              <tr className="text-xs text-slate-400 text-left">
                <th className="px-4 py-3 w-8"></th>
                <th className="px-4 py-3 w-12">On</th>
                <th className="px-4 py-3 w-16">#</th>
                <th className="px-4 py-3">Source IP</th>
                <th className="px-4 py-3">Destination IP</th>
                <th className="px-4 py-3">Port</th>
                <th className="px-4 py-3">Protocol</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, index) => (
                <DraggableRule key={rule.id} rule={rule} index={index} moveRule={moveRule} />
              ))}
            </tbody>
          </table>
        </div>

        {rules.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <Shield className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No firewall rules configured</p>
            <p className="text-xs mt-1">Click "Add Rule" to create your first rule</p>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
