# Design Guidelines - Sistema de Controle Financeiro Empresarial

## Design Approach

**Selected System**: Material Design (Content-rich, data-heavy enterprise applications)

**Rationale**: Financial management systems require clear data hierarchy, robust form handling, and professional aesthetics. Material Design provides excellent patterns for tables, charts, and complex data interactions while maintaining accessibility and visual consistency.

**Core Principles**:
- Data clarity over decoration
- Efficient task completion
- Professional credibility
- Scannable information architecture

## Typography

**Font Family**: Inter (Google Fonts)
- Primary: Inter (body, forms, data tables)
- Headings: Inter with increased weight

**Type Scale**:
- Page Titles: text-3xl font-bold (financial module headers)
- Section Headers: text-xl font-semibold (dashboard widgets, report sections)
- Subsections: text-lg font-medium (table headers, form sections)
- Body/Data: text-base font-normal (table cells, form labels)
- Metadata: text-sm (timestamps, helper text, secondary info)
- Small Labels: text-xs (tags, badges, micro-data)

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8
- Tight spacing: p-2, gap-2 (table cells, compact lists)
- Standard spacing: p-4, gap-4 (cards, form fields)
- Section spacing: p-6, gap-6 (module containers)
- Page spacing: p-8, gap-8 (main content areas)

**Grid Structure**:
- Main layout: Sidebar navigation (w-64) + Content area (flex-1)
- Dashboard: 2-column grid (lg:grid-cols-2) for KPI cards
- Tables: Full-width with horizontal scroll on mobile
- Forms: Single column max-w-2xl for optimal data entry

**Container Strategy**:
- Application shell: Full viewport height (h-screen)
- Content areas: px-6 py-8 with natural scrolling
- Cards/Modules: Contained width with consistent padding

## Component Library

### Navigation
**Sidebar Navigation**:
- Fixed left sidebar with module sections (Contas a Pagar, Contas a Receber, Fluxo de Caixa, DRE, Dashboard, Relatórios)
- Active state with subtle background and left border accent
- Icons from Heroicons (outline style)
- Collapsible sections for sub-navigation

**Top Bar**:
- Company name/logo left
- Global actions center (date range selector, sync Mercado Pago)
- User profile/notifications right

### Data Display

**Tables**:
- Striped rows for readability (alternating subtle backgrounds)
- Sticky headers for long scrolling
- Sortable columns with arrow indicators
- Row actions (edit, delete, view details) on hover/tap
- Pagination with page size options (10, 25, 50, 100)
- Status badges (Pago, Pendente, Vencido) with semantic colors

**Cards/Widgets**:
- Elevated surface (shadow-md)
- Header with title and action icon
- Content area with appropriate padding
- Footer for metadata or actions

**Charts** (Dashboard & DRE):
- Line charts for cash flow trends
- Bar charts for expense categories
- Donut charts for revenue breakdown
- Legend positioned below charts
- Tooltips on hover for precise values

### Forms

**Input Fields**:
- Floating labels or top-aligned labels
- Clear validation states (success, error, warning)
- Helper text below inputs
- Required field indicators (asterisk)
- Date pickers for payment dates
- Currency inputs with proper formatting (R$)
- File upload zones for attachments (drag-drop enabled)

**Action Buttons**:
- Primary: Solid background (Cadastrar, Salvar, Gerar Relatório)
- Secondary: Outlined (Cancelar, Voltar)
- Danger: Red variant (Excluir)
- Icon buttons for quick actions (edit, delete, download)

### Alerts & Notifications

**Alert Banners**:
- Vencimento warnings (yellow/amber)
- Divergência notifications (red)
- Success confirmations (green)
- Position: Top of content area, dismissible

**Badge Indicators**:
- Count badges for pending items (contas vencendo)
- Status badges in tables
- Category tags for expense classification

### Modals & Overlays

**Dialogs**:
- Confirmation dialogs for deletions
- Detail views for transaction inspection
- Form modals for quick entry (nova conta, novo pagamento)
- Max width: max-w-2xl centered
- Overlay backdrop with blur

**Dropdowns**:
- Filter menus (categoria, centro de custo, período)
- Action menus (more options in tables)
- Account selectors with search

## Data Visualization Specifics

**Dashboard KPIs**:
- Large metric display (text-4xl font-bold)
- Trend indicators (arrows up/down with percentage)
- Comparison text (vs. período anterior)
- Compact card layout (grid-cols-2 lg:grid-cols-4)

**DRE Display**:
- Hierarchical structure with indentation
- Bold totals and subtotals
- Percentage columns alongside values
- Period comparison columns
- Collapsible sections for detailed breakdown

**Fluxo de Caixa**:
- Calendar view option for daily visualization
- Timeline view with transaction bars
- Projection overlay (dashed lines for future)
- Saldo indicators (available vs. projected)

## Animations

Use sparingly - only for:
- Smooth transitions between navigation sections (200ms)
- Loading states (spinner or skeleton screens)
- Chart entry animations (stagger by 50ms)
- Dropdown/modal open/close (150ms ease)

No decorative animations.

## Accessibility
- Keyboard navigation throughout
- ARIA labels for all interactive elements
- Sufficient color contrast (WCAG AA minimum)
- Focus indicators on all interactive elements
- Screen reader announcements for dynamic content updates