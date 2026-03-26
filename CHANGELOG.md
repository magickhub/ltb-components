# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-26

### Added

- Initial release of LTB Components
- **AIChatWidget**: Complete AI chat interface with:
  - Conversation sidebar with grouping by date
  - Message list with user/assistant/system message styling
  - Input with file attachment support (configurable max files and size)
  - Header with sidebar toggle and customizable title
  - Full customization via CSS variables and classNames
  - Action/Template system for injecting context into conversations
  - Badge display for executed templates on messages
  - Support for markdown, code blocks, and HTML rendering in messages
- **Template/Action System**:
  - Execute reusable templates that inject context into conversations
  - Show template badges ("Plantilla: X") on messages
  - Template content visible while sending to AI backend
  - Loading state while template executes
  - Pass conversation ID to action handlers
- **Modular components**: Use individual components for custom layouts:
  - `ChatMessage` - Single message display with attachments and action badges
  - `ChatMessageList` - Scrollable message container with loading states
  - `ChatInput` - Message input with file attachments and action menu
  - `ChatSidebar` - Conversation list with delete confirmation
  - `ChatHeader` - Chat header with toggle
  - `ChatActions` - Template/action dropdown menu
- **Configurable texts**: Customize all UI labels:
  - Header title, sidebar title, input placeholder
  - Empty state messages, loading text
  - Delete confirmation message, action button text
- **File attachments**: Support for multiple file types with:
  - Configurable max file size per attachment
  - Configurable max number of attachments per message
  - File type restrictions
- **TypeScript support**: Full type definitions for all components, props, and message types
- **Dark mode support**: Built-in dark theme via CSS variables
- **Accessibility**: ARIA labels and keyboard navigation support
- **Hooks**: Utility hooks for file handling, auto-scroll, and text resizing

### Documentation

- Getting started guide with installation via GitHub
- Component API reference with all props documented
- Type definitions for Message, ChatAction, MessageAction, Attachment, Conversation
- Customization examples with CSS variables
- Interactive demos with actions, file uploads, and multiple conversations
- Changelog with version history
