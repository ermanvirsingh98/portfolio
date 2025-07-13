"use client";

interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Start writing...",
    className = ""
}: RichTextEditorProps) {
    return (
        <div className={`border rounded-md p-4 ${className}`}>
            <textarea
                value={value || ""}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[200px] resize-none border-none outline-none bg-transparent"
                style={{ fontFamily: 'inherit' }}
            />
        </div>
    );
} 