'use client';

import { useEffect, useRef, useState } from 'react';
import { Editor } from 'primereact/editor';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@shadcdn/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@shadcdn/dialog';
import { Input } from '@shadcdn/input';
import { Button } from '@shadcdn/button';
import Quill from 'quill';

type Range = {
    index: number;
    length: number;
};

interface CustomEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function CustomEditor({ value, onChange }: CustomEditorProps) {
    const [showEmojiDialog, setShowEmojiDialog] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkValue, setLinkValue] = useState('');
    const [savedRange, setSavedRange] = useState<Range | null>(null);
    const [linkMode, setLinkMode] = useState(false);

    const editorRef = useRef<Editor | null>(null);

    useEffect(() => {
        const quill = editorRef.current?.getQuill();
        if (!quill) return;

        const handleTextChange = (source: string) => {
            if (linkMode && source === 'user') {
                const range = quill.getSelection();
                if (range && range.length === 0) {
                    // Применяем формат ссылки ко всему вводимому символу
                    quill.format('link', linkValue);
                }
                onChange(quill.root.innerHTML);
            }
        };

        quill.on('text-change', handleTextChange);

        return () => {
            quill.off('text-change', handleTextChange);
        };
    }, [linkMode, linkValue, onChange]);



    const handleEmojiClick = (emojiData: EmojiClickData) => {
        const quill = editorRef.current?.getQuill() as Quill | undefined;
        if (quill && savedRange) {
            quill.insertText(savedRange.index, emojiData.emoji);
            quill.setSelection(savedRange.index + emojiData.emoji.length);
            const html = quill.root.innerHTML;
            onChange(html);
        }
        setShowEmojiDialog(false);
    };

    const handleEmojiDropdownToggle = (open: boolean) => {
        setShowEmojiDialog(open);
        if (open) {
            const quill = editorRef.current?.getQuill();
            const range = quill?.getSelection();
            if (range) setSavedRange(range);
        }
    };

    const openLinkModal = () => {
        const quill = editorRef.current?.getQuill();
        const range = quill?.getSelection();

        if (range) {
            setSavedRange(range);
            setShowLinkModal(true);
        }
    };

    const insertLinkAndActivateMode = () => {
        const quill = editorRef.current?.getQuill();

        if (quill && savedRange && linkValue) {
            if (savedRange.length > 0) {
                // Применяем ссылку к выделенному тексту
                quill.formatText(savedRange.index, savedRange.length, 'link', linkValue);
                quill.setSelection(savedRange.index + savedRange.length);
            } else {
                // Просто ставим курсор там, где был, без вставки текста
                quill.setSelection(savedRange.index, 0);
            }
            setLinkMode(true); // Включаем режим ссылки для всего нового текста
            setLinkValue(linkValue); // Устанавливаем текущую ссылку
            onChange(quill.root.innerHTML);
        }
        setShowLinkModal(false);

    };




    const toggleOffLinkMode = () => {
        const quill = editorRef.current?.getQuill();
        if (linkMode) {
            setLinkMode(false);
            setLinkValue('');
            quill?.format('link', false); // снимаем формат link у выделения
        } else {
            openLinkModal();
        }
    };


    const customHeader = (
        <span className="ql-formats space-x-2">
            <button type="button" className="ql-bold bg-slate-200! px-2 py-1 rounded">B</button>
            <button type="button" className="ql-italic bg-slate-200! px-2 py-1 rounded">I</button>
            <button type="button" className="ql-underline bg-slate-200! px-2 py-1 rounded">U</button>
            <button type="button" className="ql-strike bg-slate-200! px-2 py-1 rounded">S</button>
            <button
                type="button"
                onClick={toggleOffLinkMode}
                className={`px-2 py-1 rounded ${linkMode ? 'bg-blue-500!' : 'bg-slate-200!'}`}
            >
                🔗
            </button>
            <DropdownMenu open={showEmojiDialog} onOpenChange={handleEmojiDropdownToggle}>
                <DropdownMenuTrigger asChild>
                    <button type="button" className="bg-slate-200! px-2 py-1 rounded">😊</button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='max-h-[315px] max-w-[245px] p-0 overflow-hidden'>
                    <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left' }}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </span>
    );

    return (
        <>
            <div className="flex gap-4">
                <div className="w-full">
                    <Editor
                        ref={editorRef}
                        value={value}
                        onTextChange={(e) => onChange(e.htmlValue || '')}
                        headerTemplate={customHeader}
                        style={{ height: '200px' }}
                        className="rounded-md"
                    />
                </div>
            </div>

            <Dialog open={showLinkModal} onOpenChange={(open) => {
                setShowLinkModal(open);
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Введите ссылку</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Input
                            placeholder="https://example.com"
                            value={linkValue}
                            onChange={(e) => setLinkValue(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button onClick={insertLinkAndActivateMode} type="submit">Применить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
