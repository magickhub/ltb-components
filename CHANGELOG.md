# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-04-28

### Added

- **HTML Action Card Component**: New interactive card component for HTML messages
  - Display when `htmlAction` property is set on HTML messages
  - Shows title, subtitle, and customizable Lucide icon
  - Replaces HTML iframe content with action-driven UI
  - Perfect for file downloads, external links, and executable actions
- **HtmlMessageAction Interface**: New type for defining actions on HTML messages
  - `id`: Unique identifier for action handling
  - `title`: Action title displayed in the card
  - `subtitle`: Optional description (file type, size, location, etc.)
  - `icon`: Optional Lucide icon name (defaults to 'Code2')
- **onMessageActionClicked Callback**: New event handler for HTML message actions
  - Added to `AIChatWidget`, `ChatMessageList`, and `ChatMessage` props
  - Receives full message and action details
  - Enables custom handling for different action types
- **HTML Action Card Showcase Demo**: Comprehensive demo showing 15+ examples
  - Multiple icon examples (Code2, File, Image, Github, Database, etc.)
  - Different use cases (downloads, dashboards, documentation, etc.)
  - Interactive handlers demonstrating action handling patterns
  - Console logging for debugging
- **Documentation**: 
  - HTML Action Card guide with personalization options
  - Props reference updated with new callbacks
  - Examples and use cases in component documentation
  - Detailed props table with action callback documentation

### Changed

- `Message` interface now supports `htmlAction?: HtmlMessageAction`
- `ChatMessage` component renders action card when `htmlAction` is present
- `ChatMessageList` props extended with `onMessageActionClicked` callback
- `AIChatWidgetProps` extended with `onMessageActionClicked` callback

### Improved

- Message rendering logic prioritizes action card over iframe when action is present
- Enhanced props reference documentation with interactive examples
- Better type safety with HtmlMessageAction interface

## [1.0.1] - 2026-04-21

### Added

- **HTML Message Type**: New `type: 'html'` for rendering isolated HTML content in messages
  - Uses iframe with srcdoc for secure content isolation
  - Allows custom styles and scripts within messages without affecting parent page
  - Auto-height adjustment based on content
  - Sandbox configuration for security (allow-scripts, allow-same-origin)
- **Message Type Support**: 
  - Type `'text'` (default) for normal text messages with markdown support
  - Type `'html'` for rendering custom HTML with full isolation
  - Added `MessageType` export for TypeScript support
- **Interactive HTML Examples**: 
  - Data visualization tables with dynamic styling
  - Code blocks with syntax highlighting and copy functionality
  - Live demo components with JavaScript interaction
  - Real-time widgets that update content
- **Documentation**:
  - Comprehensive HTML message guide in `docs/HTML_MESSAGES.md`
  - Demo component showcasing various HTML message use cases
  - Examples of IA-generated content rendering (tables, code, widgets)
  - Browser support and sandbox limitation documentation

### Changed

- `ChatMessage` component now handles both text and HTML message rendering based on type
- Message interface updated with optional `type` field

### Added

- **HTML Message Type**: New `type: 'html'` for rendering isolated HTML content in messages
  - Uses iframe with srcdoc for secure content isolation
  - Allows custom styles and scripts within messages without affecting parent page
  - Auto-height adjustment based on content
  - Sandbox configuration for security (allow-scripts, allow-same-origin)
- **Message Type Support**: 
  - Type `'text'` (default) for normal text messages with markdown support
  - Type `'html'` for rendering custom HTML with full isolation
  - Added `MessageType` export for TypeScript support
- **Interactive HTML Examples**: 
  - Data visualization tables with dynamic styling
  - Code blocks with syntax highlighting and copy functionality
  - Live demo components with JavaScript interaction
  - Real-time widgets that update content
- **Documentation**:
  - Comprehensive HTML message guide in `docs/HTML_MESSAGES.md`
  - Demo component showcasing various HTML message use cases
  - Examples of IA-generated content rendering (tables, code, widgets)
  - Browser support and sandbox limitation documentation

### Changed

- `ChatMessage` component now handles both text and HTML message rendering based on type
- Message interface updated with optional `type` field

## [1.0.0] - 2026-03-26

### Added

- Initial release of LTB Components
- **AIChatWidget**: Complete AI chat interface with:
  - Conversation sidebar with grouping by date
  - Message list with user/assistant/system message styling
  - Input with file attachment support
  - Header with sidebar toggle
  - Full customization via CSS variables and classNames
- **Modular components**: Use individual components for custom layouts:
  - `ChatMessage` - Single message display
  - `ChatMessageList` - Scrollable message container
  - `ChatInput` - Message input with file attachments
  - `ChatSidebar` - Conversation list
  - `ChatHeader` - Chat header with toggle
- **TypeScript support**: Full type definitions for all components and props
- **Dark mode support**: Built-in dark theme via CSS variables
- **Accessibility**: ARIA labels and keyboard navigation support

### Documentation

- Getting started guide
- Component API reference
- Customization examples
- Interactive demos
