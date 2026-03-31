import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Plus, PanelLeft, MessageSquare, Loader2, Bot, ChevronDown, X, Paperclip, Send, AlertTriangle, Check, Pencil, Trash2, Zap, Image, FileText, File, ChevronRight, Copy, Lightbulb, Target, BarChart3, Users } from 'lucide-react';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
function DeleteConfirmDialog({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "mx-4 w-full max-w-sm rounded-lg border border-[var(--ltb-border)] bg-[var(--ltb-bg)] p-6 shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[var(--ltb-error)]", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "h-6 w-6" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-[var(--ltb-foreground)]", children: "Confirmar eliminacion" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-[var(--ltb-muted-foreground)]", children: message }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onCancel,
          className: "flex-1 rounded-lg border border-[var(--ltb-border)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--ltb-foreground)] transition-colors hover:bg-[var(--ltb-border)]",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onConfirm,
          className: "flex-1 rounded-lg bg-[var(--ltb-error)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90",
          children: "Eliminar"
        }
      )
    ] })
  ] }) });
}
function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
  onRename,
  classNames
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(conversation.title);
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  const handleSaveTitle = () => {
    if (editTitle.trim() && editTitle !== conversation.title) {
      onRename == null ? void 0 : onRename(editTitle.trim());
    }
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setEditTitle(conversation.title);
    setIsEditing(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "group flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
        isActive ? "bg-[var(--ltb-sidebar-active)] text-[var(--ltb-sidebar-active-text)]" : "text-[var(--ltb-sidebar-text)] hover:bg-[var(--ltb-sidebar-hover)]",
        classNames == null ? void 0 : classNames.sidebarItem,
        isActive && (classNames == null ? void 0 : classNames.sidebarItemActive)
      ),
      children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 flex-shrink-0" }),
        isEditing ? /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              value: editTitle,
              onChange: (e) => setEditTitle(e.target.value),
              onKeyDown: handleKeyDown,
              className: "flex-1 bg-transparent text-sm outline-none",
              "aria-label": "Editar titulo de conversacion"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSaveTitle,
              className: "rounded p-0.5 hover:bg-[var(--ltb-border)]",
              "aria-label": "Guardar titulo",
              children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleCancelEdit,
              className: "rounded p-0.5 hover:bg-[var(--ltb-border)]",
              "aria-label": "Cancelar edicion",
              children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onSelect,
              className: "flex flex-1 flex-col items-start overflow-hidden text-left",
              children: [
                /* @__PURE__ */ jsx("span", { className: "w-full truncate text-sm font-medium", children: truncateText(conversation.title, 25) }),
                conversation.preview && /* @__PURE__ */ jsx("span", { className: "w-full truncate text-xs opacity-70", children: truncateText(conversation.preview, 30) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100", children: [
            onRename && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsEditing(true),
                className: "rounded p-1 text-[var(--ltb-muted-foreground)] hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)]",
                "aria-label": "Renombrar conversacion",
                children: /* @__PURE__ */ jsx(Pencil, { className: "h-3 w-3" })
              }
            ),
            onDelete && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onDelete,
                className: "rounded p-1 text-[var(--ltb-muted-foreground)] hover:bg-[var(--ltb-error-bg)] hover:text-[var(--ltb-error)]",
                "aria-label": "Eliminar conversacion",
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ChatSidebar({
  conversations,
  currentConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  emptyMessage = "No hay conversaciones",
  deleteConfirmMessage = "\xBFEstas seguro de que deseas eliminar esta conversacion? Esta accion no se puede deshacer.",
  title = "Conversaciones",
  className,
  classNames
}) {
  const [deleteId, setDeleteId] = React.useState(null);
  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };
  const handleConfirmDelete = () => {
    if (deleteId && onDeleteConversation) {
      onDeleteConversation(deleteId);
    }
    setDeleteId(null);
  };
  const handleCancelDelete = () => {
    setDeleteId(null);
  };
  const groupedConversations = React.useMemo(() => {
    const groups = [];
    const today = [];
    const yesterday = [];
    const thisWeek = [];
    const older = [];
    const now = /* @__PURE__ */ new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1e3);
    const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1e3);
    conversations.forEach((conv) => {
      const convDate = new Date(conv.updatedAt);
      if (convDate >= todayStart) {
        today.push(conv);
      } else if (convDate >= yesterdayStart) {
        yesterday.push(conv);
      } else if (convDate >= weekStart) {
        thisWeek.push(conv);
      } else {
        older.push(conv);
      }
    });
    if (today.length > 0) groups.push({ label: "Hoy", conversations: today });
    if (yesterday.length > 0) groups.push({ label: "Ayer", conversations: yesterday });
    if (thisWeek.length > 0) groups.push({ label: "Esta semana", conversations: thisWeek });
    if (older.length > 0) groups.push({ label: "Anteriores", conversations: older });
    return groups;
  }, [conversations]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      DeleteConfirmDialog,
      {
        isOpen: deleteId !== null,
        message: deleteConfirmMessage,
        onConfirm: handleConfirmDelete,
        onCancel: handleCancelDelete
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: cn(
          "flex h-full w-64 flex-col border-r border-[var(--ltb-border)] bg-[var(--ltb-sidebar-bg)]",
          className,
          classNames == null ? void 0 : classNames.sidebar
        ),
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex items-center justify-between border-b border-[var(--ltb-border)] p-4",
                classNames == null ? void 0 : classNames.sidebarHeader
              ),
              children: [
                /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-[var(--ltb-foreground)]", children: title }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => onNewConversation(),
                    className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--ltb-primary)] text-[var(--ltb-primary-foreground)] transition-colors hover:bg-[var(--ltb-primary-hover)]",
                    "aria-label": "Nueva conversacion",
                    children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "flex-1 overflow-y-auto p-2",
                classNames == null ? void 0 : classNames.sidebarContent
              ),
              children: conversations.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center text-center text-sm text-[var(--ltb-muted-foreground)]", children: emptyMessage }) : /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: groupedConversations.map((group) => /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "mb-1 px-3 text-xs font-medium uppercase tracking-wider text-[var(--ltb-muted-foreground)]", children: group.label }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: group.conversations.map((conversation) => /* @__PURE__ */ jsx(
                  ConversationItem,
                  {
                    conversation,
                    isActive: conversation.id === currentConversationId,
                    onSelect: () => onSelectConversation(conversation.id),
                    onDelete: onDeleteConversation ? () => handleDeleteClick(conversation.id) : void 0,
                    onRename: onRenameConversation ? (title2) => onRenameConversation(conversation.id, title2) : void 0,
                    classNames
                  },
                  conversation.id
                )) })
              ] }, group.label)) })
            }
          )
        ]
      }
    )
  ] });
}
ChatSidebar.displayName = "ChatSidebar";
function ChatHeader({
  title = "Asistente de negocio",
  onToggleSidebar,
  showSidebarToggle = false,
  className,
  classNames
}) {
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: cn(
        "flex h-14 items-center gap-3 border-b border-[var(--ltb-border)] bg-[var(--ltb-header-bg)] px-4",
        className,
        classNames == null ? void 0 : classNames.header
      ),
      children: [
        showSidebarToggle && onToggleSidebar && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onToggleSidebar,
            className: "flex h-8 w-8 items-center justify-center rounded-lg text-[var(--ltb-muted-foreground)] transition-colors hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)]",
            "aria-label": "Toggle sidebar",
            children: /* @__PURE__ */ jsx(PanelLeft, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold text-[var(--ltb-foreground)]", children: title })
      ]
    }
  );
}
ChatHeader.displayName = "ChatHeader";
function useAutoScroll(deps) {
  const ref = useRef(null);
  const depString = JSON.stringify(deps);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [depString]);
  return ref;
}
function useFileAttachments(options) {
  var _a, _b;
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const maxSize = ((_a = options == null ? void 0 : options.maxFileSize) != null ? _a : 10) * 1024 * 1024;
  const maxAttachments = (_b = options == null ? void 0 : options.maxAttachments) != null ? _b : 1;
  const validateFile = useCallback((file) => {
    var _a2;
    if (file.size > maxSize) {
      return `El archivo "${file.name}" excede el tamano maximo de ${(_a2 = options == null ? void 0 : options.maxFileSize) != null ? _a2 : 10}MB`;
    }
    if ((options == null ? void 0 : options.allowedFileTypes) && options.allowedFileTypes.length > 0) {
      const isAllowed = options.allowedFileTypes.some((type) => {
        if (type.startsWith(".")) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.startsWith(type.replace("*", ""));
      });
      if (!isAllowed) {
        return `Tipo de archivo no permitido: ${file.type || "desconocido"}`;
      }
    }
    return null;
  }, [maxSize, options == null ? void 0 : options.allowedFileTypes, options == null ? void 0 : options.maxFileSize]);
  const addFiles = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles);
    const validFiles = [];
    setFiles((prev) => {
      const remainingSlots = maxAttachments - prev.length;
      if (remainingSlots <= 0) {
        setError(`Solo puedes adjuntar un maximo de ${maxAttachments} archivo(s) por mensaje`);
        return prev;
      }
      const filesToAdd = fileArray.slice(0, remainingSlots);
      for (const file of filesToAdd) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return prev;
        }
        validFiles.push(file);
      }
      if (fileArray.length > remainingSlots) {
        setError(`Solo puedes adjuntar un maximo de ${maxAttachments} archivo(s) por mensaje`);
      } else {
        setError(null);
      }
      return [...prev, ...validFiles];
    });
  }, [validateFile, maxAttachments]);
  const removeFile = useCallback((index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const clearFiles = useCallback(() => {
    setFiles([]);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);
  const openFilePicker = useCallback(() => {
    var _a2;
    (_a2 = inputRef.current) == null ? void 0 : _a2.click();
  }, []);
  return {
    files,
    error,
    inputRef,
    addFiles,
    removeFile,
    clearFiles,
    openFilePicker
  };
}
function useAutoResize() {
  const ref = useRef(null);
  const resize = useCallback(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 200)}px`;
    }
  }, []);
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("input", resize);
      return () => element.removeEventListener("input", resize);
    }
  }, [resize]);
  return { ref, resize };
}
function ActionBadge({ action }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--ltb-action-badge-bg,#dbeafe)] px-3 py-1 text-xs font-medium text-[var(--ltb-action-badge-text,#1e40af)]", children: [
    /* @__PURE__ */ jsx(Zap, { className: "h-3 w-3" }),
    /* @__PURE__ */ jsxs("span", { children: [
      "Plantilla: ",
      action.label
    ] })
  ] });
}
function AttachmentPreview({ attachment }) {
  const isImage = attachment.type.startsWith("image/");
  const isPdf = attachment.type === "application/pdf";
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md border border-[var(--ltb-border)] bg-[var(--ltb-attachment-bg)] p-2 text-sm", children: [
    isImage ? /* @__PURE__ */ jsx(Image, { className: "h-4 w-4 text-[var(--ltb-muted-foreground)]" }) : isPdf ? /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-[var(--ltb-muted-foreground)]" }) : /* @__PURE__ */ jsx(File, { className: "h-4 w-4 text-[var(--ltb-muted-foreground)]" }),
    /* @__PURE__ */ jsx("span", { className: "flex-1 truncate text-[var(--ltb-foreground)]", children: attachment.name }),
    /* @__PURE__ */ jsx("span", { className: "text-xs text-[var(--ltb-muted-foreground)]", children: formatFileSize(attachment.size) })
  ] });
}
function CodeBlock({ code, language }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => __async(null, null, function* () {
    yield navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  });
  return /* @__PURE__ */ jsxs("div", { className: "group relative my-3 overflow-hidden rounded-lg border border-[var(--ltb-border)] bg-[var(--ltb-code-bg,#1e293b)]", children: [
    language && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-[var(--ltb-border)] bg-[var(--ltb-code-header-bg,#0f172a)] px-4 py-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[var(--ltb-code-language-text,#94a3b8)]", children: language }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleCopy,
          className: "flex items-center gap-1 rounded px-2 py-1 text-xs text-[var(--ltb-code-button-text,#94a3b8)] transition-colors hover:bg-[var(--ltb-code-button-hover,#334155)] hover:text-[var(--ltb-code-button-hover-text,#f8fafc)]",
          "aria-label": "Copiar codigo",
          children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsx("span", { children: "Copiado" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Copy, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsx("span", { children: "Copiar" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("pre", { className: "overflow-x-auto p-4", children: /* @__PURE__ */ jsx("code", { className: "text-sm text-[var(--ltb-code-text,#e2e8f0)]", children: code }) }),
    !language && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleCopy,
        className: "absolute right-2 top-2 flex items-center gap-1 rounded bg-[var(--ltb-code-button-bg,#334155)] px-2 py-1 text-xs text-[var(--ltb-code-button-text,#94a3b8)] opacity-0 transition-all hover:bg-[var(--ltb-code-button-hover,#475569)] hover:text-[var(--ltb-code-button-hover-text,#f8fafc)] group-hover:opacity-100",
        "aria-label": "Copiar codigo",
        children: copied ? /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(Copy, { className: "h-3 w-3" })
      }
    )
  ] });
}
function parseMessageContent(content) {
  const elements = [];
  let lastIndex = 0;
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textBefore = content.slice(lastIndex, match.index);
      elements.push(
        /* @__PURE__ */ jsx("span", { className: "whitespace-pre-wrap", children: parseInlineElements(textBefore) }, `text-${lastIndex}`)
      );
    }
    const language = match[1];
    const code = match[2].trim();
    elements.push(
      /* @__PURE__ */ jsx(CodeBlock, { code, language }, `code-${match.index}`)
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex);
    elements.push(
      /* @__PURE__ */ jsx("span", { className: "whitespace-pre-wrap", children: parseInlineElements(remainingText) }, `text-${lastIndex}`)
    );
  }
  return elements.length > 0 ? elements : [/* @__PURE__ */ jsx("span", { className: "whitespace-pre-wrap", children: content }, "content")];
}
function parseInlineElements(text) {
  const lines = text.split("\n");
  const tableStartIndex = lines.findIndex((line) => line.trim().startsWith("|") && line.trim().endsWith("|"));
  if (tableStartIndex !== -1) {
    const tableLines = [];
    let i = tableStartIndex;
    while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
      tableLines.push(lines[i]);
      i++;
    }
    if (tableLines.length >= 2) {
      const beforeTable = lines.slice(0, tableStartIndex).join("\n");
      const afterTable = lines.slice(i).join("\n");
      const headerCells = tableLines[0].split("|").filter((cell) => cell.trim()).map((cell) => cell.trim());
      const bodyRows = tableLines.slice(2).map(
        (row) => row.split("|").filter((cell) => cell.trim()).map((cell) => cell.trim())
      );
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        beforeTable && /* @__PURE__ */ jsx("span", { children: beforeTable }),
        /* @__PURE__ */ jsx("div", { className: "my-3 overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full border-collapse border border-[var(--ltb-border)]", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "bg-[var(--ltb-muted)]", children: headerCells.map((cell, idx) => /* @__PURE__ */ jsx("th", { className: "border border-[var(--ltb-border)] px-4 py-2 text-left text-sm font-semibold text-[var(--ltb-foreground)]", children: cell }, idx)) }) }),
          /* @__PURE__ */ jsx("tbody", { children: bodyRows.map((row, rowIdx) => /* @__PURE__ */ jsx("tr", { className: rowIdx % 2 === 0 ? "bg-[var(--ltb-bg)]" : "bg-[var(--ltb-muted)]", children: row.map((cell, cellIdx) => /* @__PURE__ */ jsx("td", { className: "border border-[var(--ltb-border)] px-4 py-2 text-sm text-[var(--ltb-foreground)]", children: cell }, cellIdx)) }, rowIdx)) })
        ] }) }),
        afterTable && /* @__PURE__ */ jsx("span", { children: parseInlineElements(afterTable) })
      ] });
    }
  }
  const parts = text.split(/(`[^`]+`)/);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = part.slice(1, -1);
      return /* @__PURE__ */ jsx("code", { className: "rounded bg-[var(--ltb-code-inline-bg,#e2e8f0)] px-1.5 py-0.5 text-sm font-mono text-[var(--ltb-code-inline-text,#0f172a)]", children: code }, index);
    }
    return part;
  });
}
function ChatMessage({ message, className, classNames }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";
  const isSystem = message.role === "system";
  const parsedContent = React.useMemo(() => {
    if (isAssistant) {
      return parseMessageContent(message.content);
    }
    return message.content;
  }, [message.content, isAssistant]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
        className,
        classNames == null ? void 0 : classNames.message
      ),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            isUser && [
              "max-w-[80%] rounded-lg px-4 py-3 bg-[var(--ltb-user-message-bg)] text-[var(--ltb-user-message-text)]",
              classNames == null ? void 0 : classNames.userMessage
            ],
            isAssistant && [
              "w-full text-[var(--ltb-assistant-message-text)]",
              classNames == null ? void 0 : classNames.assistantMessage
            ],
            isSystem && [
              "w-full text-center text-sm italic text-[var(--ltb-system-message-text)]",
              classNames == null ? void 0 : classNames.systemMessage
            ]
          ),
          children: [
            message.action && /* @__PURE__ */ jsx(ActionBadge, { action: message.action }),
            message.attachments && message.attachments.length > 0 && /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "mb-2 flex flex-col gap-2",
                  isUser ? "" : "max-w-md",
                  classNames == null ? void 0 : classNames.messageAttachments
                ),
                children: message.attachments.map((attachment) => /* @__PURE__ */ jsx(AttachmentPreview, { attachment }, attachment.id))
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  isUser ? "whitespace-pre-wrap break-words" : "break-words leading-relaxed",
                  classNames == null ? void 0 : classNames.messageContent
                ),
                children: isAssistant ? parsedContent : message.content
              }
            )
          ]
        }
      )
    }
  );
}
ChatMessage.displayName = "ChatMessage";
function ChatMessageList({
  messages,
  isLoading = false,
  emptyMessage = "Inicia una conversacion",
  emptyHint = "Envia un mensaje para comenzar",
  loadingText = "Pensando...",
  className,
  classNames
}) {
  const scrollRef = useAutoScroll([messages, isLoading]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: scrollRef,
      className: cn(
        "flex-1 overflow-y-auto p-4",
        className,
        classNames == null ? void 0 : classNames.messageList
      ),
      children: messages.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ltb-muted)]", children: /* @__PURE__ */ jsx(MessageSquare, { className: "h-8 w-8 text-[var(--ltb-muted-foreground)]" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-[var(--ltb-foreground)]", children: emptyMessage }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[var(--ltb-muted-foreground)]", children: emptyHint })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        messages.map((message) => /* @__PURE__ */ jsx(
          ChatMessage,
          {
            message,
            classNames
          },
          message.id
        )),
        isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-[var(--ltb-assistant-message-bg)] px-4 py-3 text-[var(--ltb-assistant-message-text)]", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm", children: loadingText })
        ] }) })
      ] })
    }
  );
}
ChatMessageList.displayName = "ChatMessageList";
var iconMap = {
  zap: Zap,
  users: Users,
  "bar-chart": BarChart3,
  target: Target,
  "file-text": FileText,
  lightbulb: Lightbulb,
  bot: Bot
};
function getIcon(iconName) {
  if (!iconName) return Zap;
  return iconMap[iconName.toLowerCase()] || Zap;
}
function groupActions(actions) {
  const root = [];
  const groups = /* @__PURE__ */ new Map();
  const groupOrder = [];
  for (const action of actions) {
    if (!action.group) {
      root.push(action);
    } else {
      if (!groups.has(action.group)) {
        groups.set(action.group, []);
        groupOrder.push(action.group);
      }
      groups.get(action.group).push(action);
    }
  }
  return { root, groups, groupOrder };
}
function ActionItem({
  action,
  onClick
}) {
  const Icon = getIcon(action.icon);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: () => onClick(action),
      className: "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm text-[var(--ltb-foreground)] transition-colors hover:bg-[var(--ltb-muted)]",
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--ltb-muted-foreground)]" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium truncate", children: action.label }),
          action.description && /* @__PURE__ */ jsx("div", { className: "text-xs text-[var(--ltb-muted-foreground)] truncate", children: action.description })
        ] })
      ]
    }
  );
}
function GroupSection({
  name,
  actions,
  onActionClick
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen((prev) => !prev),
        className: "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-[var(--ltb-muted-foreground)] transition-colors hover:bg-[var(--ltb-muted)] hover:text-[var(--ltb-foreground)]",
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ jsx(
            ChevronRight,
            {
              className: cn("h-3 w-3 flex-shrink-0 transition-transform", isOpen && "rotate-90")
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: name }),
          /* @__PURE__ */ jsx("span", { className: "ml-auto text-[10px] font-normal normal-case tracking-normal opacity-60", children: actions.length })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "ml-3 border-l border-[var(--ltb-border)] pl-1", children: actions.map((action) => /* @__PURE__ */ jsx(ActionItem, { action, onClick: onActionClick }, action.id)) })
  ] });
}
function ChatActions({
  actions,
  executingAction,
  onExecuteAction,
  conversationId,
  buttonText = "Agentes",
  disabled = false,
  className
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);
  const handleActionClick = React.useCallback(
    (action) => __async(null, null, function* () {
      setIsOpen(false);
      yield onExecuteAction(action, conversationId);
    }),
    [onExecuteAction, conversationId]
  );
  if (actions.length === 0) return null;
  const isExecuting = !!executingAction;
  const { root, groups, groupOrder } = groupActions(actions);
  const hasGroups = groupOrder.length > 0;
  return /* @__PURE__ */ jsxs("div", { ref: menuRef, className: cn("relative", className), children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen(!isOpen),
        disabled: disabled || isExecuting,
        className: cn(
          "flex h-10 items-center gap-1.5 rounded-lg border border-[var(--ltb-input-border)] bg-transparent px-3 text-sm text-[var(--ltb-muted-foreground)] transition-colors hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)] disabled:cursor-not-allowed disabled:opacity-50"
        ),
        "aria-expanded": isOpen,
        "aria-haspopup": "true",
        "aria-label": "Menu de agentes",
        children: isExecuting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: executingAction == null ? void 0 : executingAction.label })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: buttonText }),
          /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-3 w-3 transition-transform", isOpen && "rotate-180") })
        ] })
      }
    ),
    isOpen && !isExecuting && /* @__PURE__ */ jsx("div", { className: "absolute bottom-full left-0 z-50 mb-2 w-64 overflow-hidden rounded-lg border border-[var(--ltb-border)] bg-[var(--ltb-bg)] shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-1 max-h-80 overflow-y-auto", children: [
      root.map((action) => /* @__PURE__ */ jsx(ActionItem, { action, onClick: handleActionClick }, action.id)),
      root.length > 0 && hasGroups && /* @__PURE__ */ jsx("div", { className: "my-1 border-t border-[var(--ltb-border)]" }),
      groupOrder.map((groupName) => /* @__PURE__ */ jsx(
        GroupSection,
        {
          name: groupName,
          actions: groups.get(groupName),
          onActionClick: handleActionClick
        },
        groupName
      ))
    ] }) })
  ] });
}
ChatActions.displayName = "ChatActions";
function ChatInput({
  placeholder = "Escribe un mensaje...",
  maxFileSize = 10,
  maxAttachments = 1,
  allowedFileTypes,
  onSendMessage,
  isLoading = false,
  disabled = false,
  className,
  classNames,
  actions,
  executingAction,
  onExecuteAction,
  conversationId,
  actionsButtonText = "Acciones"
}) {
  const [message, setMessage] = React.useState("");
  const [pendingAction, setPendingAction] = React.useState(null);
  const { ref: textareaRef, resize } = useAutoResize();
  const {
    files,
    error,
    inputRef,
    addFiles,
    removeFile,
    clearFiles,
    openFilePicker
  } = useFileAttachments({ maxFileSize, maxAttachments, allowedFileTypes });
  const canSend = (message.trim() || files.length > 0 || pendingAction) && !isLoading && !disabled && !executingAction;
  const handleSubmit = React.useCallback(() => __async(null, null, function* () {
    if (!canSend) return;
    yield onSendMessage(
      message.trim(),
      files.length > 0 ? files : void 0,
      pendingAction || void 0
    );
    setMessage("");
    clearFiles();
    setPendingAction(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }), [canSend, message, files, pendingAction, onSendMessage, clearFiles, textareaRef]);
  const handleKeyDown = React.useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);
  const handleFileChange = React.useCallback((e) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  }, [addFiles]);
  const handleClearPendingAction = React.useCallback(() => {
    setPendingAction(null);
  }, []);
  const hasActions = actions && actions.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: cn("border-t border-[var(--ltb-border)] bg-[var(--ltb-input-bg)] p-4", className, classNames == null ? void 0 : classNames.inputContainer), children: [
    pendingAction && /* @__PURE__ */ jsx("div", { className: "mb-3 flex items-center gap-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 rounded-full bg-[var(--ltb-action-badge-bg,#dbeafe)] px-3 py-1 text-xs font-medium text-[var(--ltb-action-badge-text,#1e40af)]", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Contexto: ",
        pendingAction.label
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleClearPendingAction,
          className: "ml-1 rounded-full p-0.5 hover:bg-[var(--ltb-action-badge-text,#1e40af)]/20",
          "aria-label": "Quitar accion",
          children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
        }
      )
    ] }) }),
    files.length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-3 flex flex-wrap gap-2", children: files.map((file, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex items-center gap-2 rounded-md bg-[var(--ltb-attachment-bg)] px-3 py-1.5 text-sm",
        children: [
          /* @__PURE__ */ jsx("span", { className: "max-w-[150px] truncate text-[var(--ltb-foreground)]", children: file.name }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-[var(--ltb-muted-foreground)]", children: formatFileSize(file.size) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => removeFile(index),
              className: "rounded-full p-0.5 text-[var(--ltb-muted-foreground)] hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)]",
              "aria-label": `Eliminar ${file.name}`,
              children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
            }
          )
        ]
      },
      index
    )) }),
    error && /* @__PURE__ */ jsx("div", { className: "mb-3 text-sm text-[var(--ltb-error)]", children: error }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: inputRef,
          type: "file",
          multiple: maxAttachments > 1,
          onChange: handleFileChange,
          accept: allowedFileTypes == null ? void 0 : allowedFileTypes.join(","),
          className: "hidden",
          "aria-label": "Adjuntar archivos"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: openFilePicker,
          disabled: disabled || isLoading || files.length >= maxAttachments || !!executingAction,
          className: cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--ltb-input-border)] bg-transparent text-[var(--ltb-muted-foreground)] transition-colors hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)] disabled:cursor-not-allowed disabled:opacity-50",
            classNames == null ? void 0 : classNames.attachButton
          ),
          "aria-label": "Adjuntar archivo",
          children: /* @__PURE__ */ jsx(Paperclip, { className: "h-5 w-5" })
        }
      ),
      hasActions && onExecuteAction && /* @__PURE__ */ jsx(
        ChatActions,
        {
          actions,
          executingAction,
          onExecuteAction,
          conversationId,
          buttonText: actionsButtonText,
          disabled: disabled || isLoading
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative flex-1 flex", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          ref: textareaRef,
          value: message,
          onChange: (e) => {
            setMessage(e.target.value);
            resize();
          },
          onKeyDown: handleKeyDown,
          placeholder,
          disabled: disabled || isLoading || !!executingAction,
          rows: 1,
          className: cn(
            "w-full resize-none overflow-y-auto rounded-lg border border-[var(--ltb-input-border)] bg-[var(--ltb-input-bg)] px-4 py-2 text-[var(--ltb-foreground)] placeholder:text-[var(--ltb-muted-foreground)] focus:border-[var(--ltb-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--ltb-primary)] disabled:cursor-not-allowed disabled:opacity-50",
            classNames == null ? void 0 : classNames.input
          ),
          style: { maxHeight: "200px", minHeight: "40px" }
        }
      ) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleSubmit,
          disabled: !canSend,
          className: cn(
            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--ltb-primary)] text-[var(--ltb-primary-foreground)] transition-colors hover:bg-[var(--ltb-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50",
            classNames == null ? void 0 : classNames.sendButton
          ),
          "aria-label": "Enviar mensaje",
          children: isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "h-5 w-5" })
        }
      )
    ] })
  ] });
}
ChatInput.displayName = "ChatInput";
function AIChatWidget({
  // Datos
  conversations,
  currentConversationId,
  messages,
  // Configuracion
  placeholder = "Escribe un mensaje...",
  maxFileSize = 10,
  maxAttachments = 1,
  allowedFileTypes,
  showSidebar = true,
  showHeader = true,
  headerTitle = "Chat",
  emptyStateMessage = "Inicia una conversacion",
  emptyStateHint = "Envia un mensaje para comenzar",
  emptyConversationsMessage = "No hay conversaciones",
  deleteConfirmMessage = "\xBFEstas seguro de que deseas eliminar esta conversacion? Esta accion no se puede deshacer.",
  sidebarTitle = "Conversaciones",
  loadingText = "Pensando...",
  actionsButtonText = "Acciones",
  // Acciones
  actions,
  executingAction,
  // Estilos
  className,
  classNames,
  // Callbacks
  onSendMessage,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onExecuteAction,
  // Estados
  isLoading = false,
  disabled = false
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(showSidebar);
  React.useEffect(() => {
    setSidebarOpen(showSidebar);
  }, [showSidebar]);
  const handleToggleSidebar = React.useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);
  const handleExecuteAction = React.useCallback(
    (action) => {
      onExecuteAction == null ? void 0 : onExecuteAction(action, currentConversationId);
    },
    [onExecuteAction, currentConversationId]
  );
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "ltb-chat-widget flex h-full w-full overflow-hidden rounded-lg border border-[var(--ltb-border)] bg-[var(--ltb-bg)]",
        className,
        classNames == null ? void 0 : classNames.container
      ),
      children: [
        sidebarOpen && /* @__PURE__ */ jsx(
          ChatSidebar,
          {
            conversations,
            currentConversationId,
            onNewConversation,
            onSelectConversation,
            onDeleteConversation,
            onRenameConversation,
            emptyMessage: emptyConversationsMessage,
            deleteConfirmMessage,
            title: sidebarTitle,
            classNames
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex flex-1 flex-col",
              classNames == null ? void 0 : classNames.main
            ),
            children: [
              showHeader && /* @__PURE__ */ jsx(
                ChatHeader,
                {
                  title: headerTitle,
                  onToggleSidebar: handleToggleSidebar,
                  showSidebarToggle: showSidebar,
                  classNames
                }
              ),
              /* @__PURE__ */ jsx(
                ChatMessageList,
                {
                  messages,
                  isLoading,
                  emptyMessage: emptyStateMessage,
                  emptyHint: emptyStateHint,
                  loadingText,
                  classNames
                }
              ),
              /* @__PURE__ */ jsx(
                ChatInput,
                {
                  placeholder,
                  maxFileSize,
                  maxAttachments,
                  allowedFileTypes,
                  onSendMessage,
                  isLoading,
                  disabled,
                  classNames,
                  actions,
                  executingAction,
                  onExecuteAction: handleExecuteAction,
                  actionsButtonText
                }
              )
            ]
          }
        )
      ]
    }
  );
}
AIChatWidget.displayName = "AIChatWidget";

export { AIChatWidget, ChatActions, ChatHeader, ChatInput, ChatMessage, ChatMessageList, ChatSidebar, useAutoResize, useAutoScroll, useFileAttachments };
//# sourceMappingURL=chat.js.map
//# sourceMappingURL=chat.js.map
