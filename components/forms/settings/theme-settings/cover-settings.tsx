'use client';

import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ColorPicker } from './color-picker';
import { UploadImageModal } from '../../upload-image-popup';

interface CoverSettingsProps {
  coverType: 'none' | 'color' | 'image';
  coverColor?: string;
  onCoverTypeChange: (type: 'none' | 'color' | 'image') => void;
  onCoverColorChange: (color: string) => void;
  onCoverImageChange: (file: File) => void;
  isUploading: boolean;
}

export function CoverSettings({
  coverType,
  coverColor = '#f3f4f6',
  onCoverTypeChange,
  onCoverColorChange,
  onCoverImageChange,
  isUploading,
}: CoverSettingsProps) {

  const [isImageCoverUploadOpen, setIsImageCoverUploadOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <Label className="font-normal">Cover</Label>
        <Select value={coverType} onValueChange={onCoverTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select cover type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="color">Solid Color</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {coverType === 'color' && (
        <ColorPicker
          label="Cover color"
          placeholder="Choose a background color for your form cover"
          value={coverColor}
          onChange={onCoverColorChange}
        />
      )}

      {coverType === 'image' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsImageCoverUploadOpen(true)}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload cover image
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Maximum file size: 5MB. Recommended size: 1200x400px
          </p>
        </div>
      )}

      {
        isImageCoverUploadOpen && (
          <UploadImageModal open={isImageCoverUploadOpen} onOpenChange={setIsImageCoverUploadOpen} />
        )
      }
    </div>
  );
}
