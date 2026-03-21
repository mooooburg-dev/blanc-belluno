"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

const CATEGORIES = ["WEDDING", "BABY SHOWER", "PARTY", "CORPORATE"] as const;
type Category = (typeof CATEGORIES)[number];

interface PortfolioItem {
  id: string;
  filename: string;
  originalName: string;
  order: number;
  category: Category;
  title: string;
  tag: string;
}

interface SortableItemProps {
  item: PortfolioItem;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    updates: Partial<Pick<PortfolioItem, "category" | "title" | "tag">>
  ) => void;
}

export default function SortableItem({
  item,
  onDelete,
  onUpdate,
}: SortableItemProps) {
  const [editing, setEditing] = useState(false);
  const [editCategory, setEditCategory] = useState<Category>(item.category);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editTag, setEditTag] = useState(item.tag);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    onUpdate(item.id, {
      category: editCategory,
      title: editTitle,
      tag: editTag,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditCategory(item.category);
    setEditTitle(item.title);
    setEditTag(item.tag);
    setEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm ${
        isDragging ? "z-50 shadow-lg" : ""
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing bg-black/50 text-white rounded p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        title="드래그하여 순서 변경"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="5" cy="3" r="1.5" />
          <circle cx="11" cy="3" r="1.5" />
          <circle cx="5" cy="8" r="1.5" />
          <circle cx="11" cy="8" r="1.5" />
          <circle cx="5" cy="13" r="1.5" />
          <circle cx="11" cy="13" r="1.5" />
        </svg>
      </div>

      {/* Action buttons */}
      <div className="absolute top-2 right-2 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs"
          title="편집"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center"
          title="삭제"
        >
          ✕
        </button>
      </div>

      {/* Image */}
      <div className="aspect-square relative">
        <Image
          src={`/uploads/${item.filename}`}
          alt={item.originalName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Info / Edit */}
      {editing ? (
        <div className="p-3 flex flex-col gap-2 border-t border-gray-100">
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value as Category)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="제목"
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          />
          <input
            type="text"
            value={editTag}
            onChange={(e) => setEditTag(e.target.value)}
            placeholder="태그"
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          />
          <div className="flex gap-1.5">
            <button
              onClick={handleSave}
              className="flex-1 bg-gray-900 text-white text-xs rounded px-2 py-1.5 hover:bg-gray-800"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-100 text-gray-600 text-xs rounded px-2 py-1.5 hover:bg-gray-200"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2 border-t border-gray-100">
          <span className="inline-block text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mb-1">
            {item.category}
          </span>
          <p className="text-xs text-gray-700 truncate">
            {item.title || item.originalName}
          </p>
          {item.tag && (
            <p className="text-[10px] text-gray-400 truncate">{item.tag}</p>
          )}
        </div>
      )}
    </div>
  );
}
