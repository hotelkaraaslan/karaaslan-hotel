'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { useEffect } from 'react'

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
}

const ToolbarBtn = ({ onClick, active, title, children }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-2 py-1 rounded text-sm font-medium transition-colors ${active ? 'bg-amber-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
  >
    {children}
  </button>
)

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Blog yazısını buraya yazın...' }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] px-4 py-3 text-sm text-gray-800 leading-relaxed',
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content])

  if (!editor) return null

  const setLink = () => {
    const url = window.prompt('URL girin:', editor.getAttributes('link').href)
    if (url === null) return
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Kalın"><b>K</b></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="İtalik"><i>İ</i></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Altı Çizili"><u>A</u></ToolbarBtn>
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Başlık 2">H2</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Başlık 3">H3</ToolbarBtn>
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Madde Listesi">• Liste</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numaralı Liste">1. Liste</ToolbarBtn>
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarBtn onClick={setLink} active={editor.isActive('link')} title="Bağlantı Ekle">🔗</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Alıntı">" "</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Yatay Çizgi">—</ToolbarBtn>
        <div className="w-px bg-gray-300 mx-1" />
        {/* Tablo */}
        <ToolbarBtn onClick={insertTable} active={editor.isActive('table')} title="Tablo Ekle">⊞ Tablo</ToolbarBtn>
        {editor.isActive('table') && (
          <>
            <ToolbarBtn onClick={() => editor.chain().focus().addColumnAfter().run()} title="Sütun Ekle">+Sütun</ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().addRowAfter().run()} title="Satır Ekle">+Satır</ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().deleteColumn().run()} title="Sütun Sil">-Sütun</ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().deleteRow().run()} title="Satır Sil">-Satır</ToolbarBtn>
            <ToolbarBtn onClick={() => editor.chain().focus().deleteTable().run()} title="Tabloyu Sil">🗑 Tablo</ToolbarBtn>
          </>
        )}
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Geri Al">↩</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="İleri Al">↪</ToolbarBtn>
      </div>
      {/* Editor */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
      {/* Tablo stilleri */}
      <style>{`
        .ProseMirror table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
        .ProseMirror th, .ProseMirror td { border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; min-width: 80px; }
        .ProseMirror th { background: #f9fafb; font-weight: 600; }
        .ProseMirror .selectedCell { background: #fef3c7; }
        .ProseMirror .column-resize-handle { background-color: #c9a96e; width: 2px; cursor: col-resize; }
      `}</style>
    </div>
  )
}
