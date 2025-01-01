'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface FormNameDisplayProps {
  name: string;
  onChange: (name: string) => void;
  className?: string;
}

export function FormNameDisplay({
  name,
  onChange,
  className,
}: FormNameDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    if (editedName.trim()) {
      onChange(editedName.trim());
    }
    setIsEditing(false);
  };

  const displayName = name.length > 16 ? `${name.slice(0, 16)}...` : name;

  return (
    <>
      <div
        className={cn('flex items-center gap-1.5 group', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-sm font-normal">{displayName}</span>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-6 w-6 opacity-0 transition-opacity',
            isHovered && 'opacity-100'
          )}
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-3.5 w-3.5 text-neutral-500" strokeWidth={2} />
        </Button>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="min-w-[480px]">
          <DialogHeader>
            <DialogTitle>Rename form</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Form name"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
