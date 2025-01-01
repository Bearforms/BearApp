'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FormRenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  onNameChange: (value: string) => void;
  onSave: () => void;
}

export function FormRenameDialog({
  open,
  onOpenChange,
  name,
  onNameChange,
  onSave,
}: FormRenameDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] md:min-w-[480px]">
        <DialogHeader>
          <DialogTitle>Rename form</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Form name"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}