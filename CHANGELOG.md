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
