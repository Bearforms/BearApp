'use client';

import { useCallback } from 'react';

export function useRichTextEditor(
  editorRef: React.RefObject<HTMLDivElement>,
  onChange?: (value: string) => void
) {
  const handleFormat = useCallback((command: string, value?: string) => {
    // Special handling for headings and paragraph
    if (command === 'h1' || command === 'h2' || command === 'h3' || command === 'p') {
      document.execCommand('formatBlock', false, `<${command}>`);
    } else {
      document.execCommand(command, false, value);
    }
    editorRef.current?.focus();
  }, []);

  const isFormatActive = useCallback((format: string) => {
    // Special handling for headings and paragraph
    if (format === 'h1' || format === 'h2' || format === 'h3' || format === 'p') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const parentElement = selection.getRangeAt(0).commonAncestorContainer as HTMLElement;
        return parentElement.nodeName.toLowerCase() === format || 
               (parentElement.parentElement && parentElement.parentElement.nodeName.toLowerCase() === format);
      }
      return false;
    }
    return document.queryCommandState(format);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey) {
      if (e.altKey) {
        switch (e.key) {
          case '0':
            e.preventDefault();
            handleFormat('p');
            break;
          case '1':
            e.preventDefault();
            handleFormat('h1');
            break;
          case '2':
            e.preventDefault();
            handleFormat('h2');
            break;
          case '3':
            e.preventDefault();
            handleFormat('h3');
            break;
        }
      } else {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            handleFormat('bold');
            break;
          case 'i':
            e.preventDefault();
            handleFormat('italic');
            break;
          case 'u':
            e.preventDefault();
            handleFormat('underline');
            break;
          case 'x':
            if (e.shiftKey) {
              e.preventDefault();
              handleFormat('strikethrough');
            }
            break;
        }
      }
    }
  }, [handleFormat]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  const syncContent = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  return {
    handleFormat,
    isFormatActive,
    handleKeyDown,
    handlePaste,
    syncContent,
  };
}