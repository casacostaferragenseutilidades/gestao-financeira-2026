import { useLocation, Link } from "wouter";
import { useAuth } from "@/lib/auth";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  TrendingUp,
  FileText,
  BarChart3,
  Building2,
  Users,
  Tags,
  FolderTree,
  RefreshCw,
  UserCog,
  Target,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Contas a Pagar",
    url: "/contas-pagar",
    icon: CreditCard,
  },
  {
    title: "Contas a Receber",
    url: "/contas-receber",
    icon: Wallet,
  },
  {
    title: "Fluxo de Caixa",
    url: "/fluxo-caixa",
    icon: TrendingUp,
  },
  {
    title: "DRE",
    url: "/dre",
    icon: FileText,
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: BarChart3,
  },
  {
    title: "Metas",
    url: "/metas-financeiras",
    icon: Target,
  },
];

const settingsNavItems = [
  {
    title: "Fornecedores",
    url: "/fornecedores",
    icon: Building2,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
  },
  {
    title: "Categorias",
    url: "/categorias",
    icon: Tags,
  },
  {
    title: "Centros de Custo",
    url: "/centros-custo",
    icon: FolderTree,
  },
];

const adminNavItems = [
  {
    title: "Usuários",
    url: "/usuarios",
    icon: UserCog,
    adminOnly: true,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/90">
      <SidebarHeader className="p-4 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3 transition-all duration-300 group-data-[state=collapsed]:justify-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-600 shadow-lg shadow-primary/25 ring-1 ring-white/10">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col group-data-[state=collapsed]:hidden overflow-hidden transition-all duration-300">
            <span className="text-lg font-bold tracking-tight text-sidebar-foreground truncate" data-testid="text-app-name">
              FinControl
            </span>
            <span className="text-xs font-medium text-muted-foreground truncate">
              Gestão Financeira
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                  >
                    <Link href={item.url} data-testid={`link-nav-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Cadastros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                  >
                    <Link href={item.url} data-testid={`link-nav-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {user?.role === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                    >
                      <Link href={item.url} data-testid={`link-nav-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full gap-2" data-testid="button-sync-mercadopago">
          <RefreshCw className="h-4 w-4" />
          Sincronizar Mercado Pago
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
