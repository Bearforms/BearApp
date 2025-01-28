"use client";

import { Button } from '@/components/ui/button';
import { Loader2, Search, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import { compressImage } from '@/lib/image-utils';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { useFormStore } from '@/stores/form-store';
import { createClient } from '@/supabase/client';
import { ThemeSettings } from '@/types/form';
import { debounce } from "lodash";
import axios from 'axios';
import { fetchApi } from '@/lib/api';

interface UploadImageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const searchImage = async (query: string) => {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const response = await fetchApi(`https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query}`);
  return (response?.data?.results || [])?.map((res: any)=>res.urls.regular).filter(Boolean);
 }

export function UploadImageModal({ open, onOpenChange }: UploadImageModalProps) {
  const [selectedLocalFile, setSelectedLocalFile] = useState<File | null>(null);
  const [selectedLocalFileUrl, setSelectedLocalFileUrl] = useState<string | null>(null);

  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [unsplashResults, setUnsplashResults] = useState([]);

  const form = useFormStore((state) => state.form);
  const updateForm = useFormStore((state) => state.updateForm);

  const [search, setSearch] = useState('');

  const handleSearchChange = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  // eslint-disable-next-line
  const debouncedSearch = useCallback(
    debounce(async (value) => {
      const results = await searchImage(value);
      setUnsplashResults(results);
    }, 500),
    []
  )

  const handleFileChange = async (file: File) => {
    if (!file) return;

    setSelectedLocalFile(file);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (typeof event.target?.result === 'string') {
          const compressed = await compressImage(event.target.result, 200, 200, 0.8);
          setSelectedLocalFileUrl(compressed);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFileChange(acceptedFiles[0]);
    },
    [],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!selectedLocalFile || !form) return;
    setIsUploadingFile(true);
    setUploadError(null);

    try {

      const supabase = await createClient();
      const id = nanoid();

      const parsedFileName = selectedLocalFile.name.replace(/\s/g, '-').toLowerCase(); // Replace spaces with dashes and convert to lowercase
      const saveFileName = `covers/${id}/${parsedFileName}`;
      const { data, error } = await supabase.storage
        .from('bearforms')
        .upload(saveFileName, selectedLocalFile, {
          upsert: false,
        });

      console.log({ data, error });

      if (error) {
        setIsUploadingFile(false);
        setUploadError('Error uploading file');
        return;
      }

      const { data: imgUrl } = await supabase.storage
        .from("bearforms")
        .getPublicUrl(saveFileName);

      console.log(imgUrl);
      updateForm(form.id, {
        themeSettings: {
          ...(form.themeSettings || {}),
          coverType: 'image',
          coverImage: imgUrl.publicUrl || form.themeSettings?.coverImage,
        } as ThemeSettings
      }, false);
      setIsUploadingFile(false);
      setSelectedLocalFile(null);
      setSelectedLocalFileUrl(null);
      onOpenChange(false);
    } catch (error) {
      setIsUploadingFile(false);
    }
  };

  useEffect(() => {
    searchImage('nature').then((results) => {
      setUnsplashResults(results);
    }).catch((error) => { 
      console.error('Error fetching unsplash images:', error);
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={isUploadingFile ? () => { } : onOpenChange}>
      <DialogContent className="w-full md:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Add image</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-[216px] grid-cols-2">
            <TabsTrigger value="upload">Upload media</TabsTrigger>
            <TabsTrigger value="unsplash">Unsplash</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className='pt-4  w-full'>

            <div
              {...getRootProps()}
              className={cn("w-full flex items-center border border-dashed cursor-pointer border-neutral-200 justify-center py-8 px-2 rounded-lg")}
            >
              <input {...getInputProps()} />

              {
                selectedLocalFileUrl ? (
                  <Image
                    src={selectedLocalFileUrl}
                    alt="Selected file"
                    width={128}
                    height={128}
                    className="size-32 object-cover border border-neutral-50 rounded-lg"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 items-center">
                    <p className="leading-5 text-foreground text-sm">
                      Drag and drop file here or <span className="underline">choose file</span>
                    </p>
                    <p className="leading-5 text-muted-foreground text-sm Foreground/Neutral/4/Rest">No file chosen</p>
                  </div>
                )
              }
            </div>


          </TabsContent>

          <TabsContent value="unsplash" className='pt-4  w-full'>
            <div className="flex items-center py-2 px-3 gap-2 border border-neutral-200 rounded-lg">
              <Search className='text-neutral-600 size-5' />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search Unsplash"
                className="w-full  py-2"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
              {unsplashResults.map((url: string) => (
                <div key={url} className="relative aspect-w-1 aspect-h-1">
                  <Image
                    src={url}
                    alt="Unsplash image"
                    height={200}
                    width={200}
                    objectFit="cover"
                    className="rounded-lg cursor-pointer w-full h-[89px]"
                    onClick={() => { 
                      updateForm(form!.id, {
                        themeSettings: {
                          ...(form!.themeSettings || {}),
                          coverType: 'image',
                          coverImage: url,
                        } as ThemeSettings
                      }, false);
                      onOpenChange(false);
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className='mt-6'>
          <Button
            type="button"
            variant="outline"
            disabled={isUploadingFile}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button"
            disabled={isUploadingFile || !selectedLocalFile}
            onClick={handleUpload}
          >
            {isUploadingFile ? (
              <>
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  strokeWidth={2}
                />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
