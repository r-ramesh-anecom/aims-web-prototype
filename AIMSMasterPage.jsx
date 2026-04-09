import { useState, useRef, useEffect } from "react";

// ─── Icon ─────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path d={d} />
  </svg>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const IC = {
  dashboard:    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  clients:      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  vendors:      "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  users:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8",
  warehouse:    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  transport:    "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  crating:      "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  finance:      "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  projects:     "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  reports:      "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  settings:     "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  bell:         "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  search:       "M21 21l-4.35-4.35 M17 11A6 6 0 105 11a6 6 0 0012 0z",
  chevDown:     "M6 9l6 6 6-6",
  chevRight:    "M9 18l6-6-6-6",
  menu:         "M3 12h18 M3 6h18 M3 18h18",
  close:        "M18 6L6 18 M6 6l12 12",
  logout:       "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  profile:      "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8",
  art:          "M2 13.5V19a1 1 0 001 1h18a1 1 0 001-1v-5.5 M12 2L2 7l10 5 10-5-10-5 M2 17l10 5 10-5",
  plus:         "M12 5v14 M5 12h14",
  activity:     "M22 12h-4l-3 9L9 3l-3 9H2",
  check:        "M20 6L9 17l-5-5",
  clock:        "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  map:          "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z M8 2v16 M16 6v16",
  archive:      "M21 8v13H3V8 M1 3h22v5H1z M10 12h4",
  dollar:       "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  package:      "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  trending:     "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  box:          "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  flag:         "M4 15s1-1 4-1 4 2 8 2 4-1 4-1V3s-1 1-4 1-4-2-8-2-4 1-4 1z M4 22v-7",
  milestone:    "M12 2L2 7l10 5 10-5-10-5 M2 17l10 5 10-5 M2 12l10 5 10-5",
  kanban:       "M3 3h6v18H3z M9 3h6v10H9z M15 3h6v14h-6z",
  task:         "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  shield:       "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  eye:          "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  edit2:        "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  alert:        "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  thermo:       "M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z",
  droplet:      "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
  inbox:        "M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  roles:        "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  creditCard:   "M1 4h22v16H1z M1 10h22",
  users2:       "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  refresh:      "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15",
};

// ─── Permission System ────────────────────────────────────────────────────────
const P = { NONE: 0, VIEW: 1, CREATE: 2, EDIT: 3, APPROVE: 4, FULL: 5 };

// module IDs must match navItems id values
const ROLE_ACCESS = {
  system_admin:      { _all: P.FULL },
  executive:         { _all: P.VIEW, finance: P.APPROVE, reports: P.FULL, dashboard: P.FULL },
  projects_manager:  { dashboard: P.FULL, projects: P.FULL, clients: P.EDIT, crating: P.CREATE, transport: P.CREATE, finance: P.VIEW, warehouse: P.VIEW, reports: P.VIEW },
  finance_manager:   { dashboard: P.FULL, finance: P.FULL, clients: P.VIEW, vendors: P.VIEW, transport: P.VIEW, warehouse: P.VIEW, projects: P.VIEW, reports: P.FULL },
  warehouse_manager: { dashboard: P.FULL, warehouse: P.FULL, transport: P.VIEW, clients: P.VIEW, crating: P.VIEW, reports: P.VIEW },
  transport_manager: { dashboard: P.FULL, transport: P.FULL, warehouse: P.VIEW, crating: P.VIEW, vendors: P.VIEW, clients: P.VIEW, reports: P.VIEW },
  client_manager:    { dashboard: P.FULL, clients: P.FULL, projects: P.VIEW, finance: P.VIEW, transport: P.VIEW, warehouse: P.VIEW, reports: P.VIEW },
  crating_manager:   { dashboard: P.FULL, crating: P.FULL, warehouse: P.VIEW, transport: P.VIEW, clients: P.VIEW, reports: P.VIEW },
  vendor_manager:    { dashboard: P.FULL, vendors: P.FULL, finance: P.VIEW, transport: P.VIEW, reports: P.VIEW },
  module_user:       { dashboard: P.VIEW, projects: P.EDIT },
  module_viewer:     { dashboard: P.VIEW, projects: P.VIEW },
  client_portal:     { clients: P.VIEW },
};

const ROLE_DEFS = {
  system_admin:      { label: "System Administrator",  short: "SysAdmin",    badge: "bg-rose-600 text-white",    dot: "bg-rose-500",    initials: "SA" },
  executive:         { label: "Executive Director",     short: "Executive",   badge: "bg-purple-600 text-white",  dot: "bg-purple-500",  initials: "ED" },
  projects_manager:  { label: "Project Manager",        short: "Proj. Mgr",   badge: "bg-blue-600 text-white",    dot: "bg-blue-500",    initials: "PM", module: "projects"  },
  finance_manager:   { label: "Finance Manager",        short: "Finance Mgr", badge: "bg-emerald-600 text-white", dot: "bg-emerald-500", initials: "FM", module: "finance"   },
  warehouse_manager: { label: "Warehouse Manager",      short: "WH Mgr",      badge: "bg-amber-600 text-white",   dot: "bg-amber-500",   initials: "WM", module: "warehouse" },
  transport_manager: { label: "Transport Manager",      short: "Trans. Mgr",  badge: "bg-orange-600 text-white",  dot: "bg-orange-500",  initials: "TM", module: "transport" },
  client_manager:    { label: "Client Manager",         short: "Client Mgr",  badge: "bg-indigo-600 text-white",  dot: "bg-indigo-500",  initials: "CM", module: "clients"   },
  crating_manager:   { label: "Crating Manager",        short: "Crating Mgr", badge: "bg-violet-600 text-white",  dot: "bg-violet-500",  initials: "CR", module: "crating"   },
  vendor_manager:    { label: "Vendor Manager",         short: "Vendor Mgr",  badge: "bg-teal-600 text-white",    dot: "bg-teal-500",    initials: "VM", module: "vendors"   },
  module_user:       { label: "Module User",            short: "User",        badge: "bg-slate-500 text-white",   dot: "bg-slate-400",   initials: "MU", module: "projects"  },
  module_viewer:     { label: "Module Viewer",          short: "Viewer",      badge: "bg-slate-400 text-white",   dot: "bg-slate-300",   initials: "MV", module: "projects"  },
  client_portal:     { label: "Client Portal",          short: "Client",      badge: "bg-slate-500 text-white",   dot: "bg-slate-400",   initials: "CP"  },
};

const PERM_BADGES = {
  [P.FULL]:   { label: "Full",    cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  [P.APPROVE]:{ label: "Approve", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30"       },
  [P.EDIT]:   { label: "Edit",    cls: "bg-blue-500/20 text-blue-400 border-blue-500/30"          },
  [P.CREATE]: { label: "Create",  cls: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"    },
  [P.VIEW]:   { label: "View",    cls: "bg-slate-500/20 text-slate-400 border-slate-500/30"       },
};

function getPerm(role, moduleId) {
  const access = ROLE_ACCESS[role];
  if (!access) return P.NONE;
  if (access._all !== undefined) return access._all;
  return access[moduleId] ?? P.NONE;
}

// ─── Navigation Structure ─────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard",            icon: "dashboard", badge: null, alwaysShow: true },
  {
    id: "clients",   label: "Client Management",    icon: "clients",   badge: "12",
    children: [
      { id: "clients-list",    label: "All Clients",         icon: "clients",  path: "/clients"              },
      { id: "clients-new",     label: "Add Client",          icon: "plus",     path: "/clients/new"          },
      { id: "clients-consign", label: "Consignments",        icon: "package",  path: "/clients/consignments" },
      { id: "clients-history", label: "Client History",      icon: "clock",    path: "/clients/history"      },
    ],
  },
  {
    id: "vendors",   label: "Vendor Management",    icon: "vendors",   badge: null,
    children: [
      { id: "vendors-list",    label: "All Vendors",         icon: "vendors",  path: "/vendors"              },
      { id: "vendors-new",     label: "Add Vendor",          icon: "plus",     path: "/vendors/new"          },
      { id: "vendors-contracts",label:"Contracts",           icon: "archive",  path: "/vendors/contracts"    },
      { id: "vendors-perf",    label: "Performance",         icon: "trending", path: "/vendors/performance"  },
    ],
  },
  {
    id: "users",     label: "User Management",      icon: "users",     badge: null, adminOnly: true,
    children: [
      { id: "users-list",      label: "All Users",           icon: "users",    path: "/users"                },
      { id: "users-new",       label: "Add User",            icon: "plus",     path: "/users/new"            },
      { id: "users-roles",     label: "Roles & Permissions", icon: "shield",   path: "/users/roles"          },
      { id: "users-activity",  label: "Activity Log",        icon: "activity", path: "/users/activity"       },
    ],
  },
  {
    id: "warehouse", label: "Storage & Warehouse",  icon: "warehouse", badge: "3",
    children: [
      { id: "wh-inventory",    label: "Inventory",           icon: "box",      path: "/warehouse/inventory"  },
      { id: "wh-locations",    label: "Locations",           icon: "map",      path: "/warehouse/locations"  },
      { id: "wh-checkin",      label: "Check In / Out",      icon: "check",    path: "/warehouse/checkin"    },
      { id: "wh-climate",      label: "Climate Control",     icon: "thermo",   path: "/warehouse/climate"    },
      { id: "wh-reports",      label: "Storage Reports",     icon: "reports",  path: "/warehouse/reports"    },
    ],
  },
  {
    id: "transport", label: "Transportation",        icon: "transport", badge: "5",
    children: [
      { id: "tr-shipments",    label: "Shipments",           icon: "transport",path: "/transport/shipments"  },
      { id: "tr-new",          label: "New Shipment",        icon: "plus",     path: "/transport/new"        },
      { id: "tr-tracking",     label: "Live Tracking",       icon: "map",      path: "/transport/tracking"   },
      { id: "tr-planner",      label: "Vehicle Run Planner", icon: "kanban",   path: "/transport/planner"    },
      { id: "tr-couriers",     label: "Couriers",            icon: "vendors",  path: "/transport/couriers"   },
      { id: "tr-routes",       label: "Routes",              icon: "map",      path: "/transport/routes"     },
    ],
  },
  {
    id: "crating",   label: "Crating",               icon: "crating",   badge: null,
    children: [
      { id: "cr-orders",       label: "Crating Orders",      icon: "crating",  path: "/crating/orders"       },
      { id: "cr-new",          label: "New Order",           icon: "plus",     path: "/crating/new"          },
      { id: "cr-materials",    label: "Materials",           icon: "package",  path: "/crating/materials"    },
      { id: "cr-specs",        label: "Specifications",      icon: "reports",  path: "/crating/specs"        },
    ],
  },
  {
    id: "finance",   label: "Finance",               icon: "finance",   badge: "2",
    children: [
      { id: "fin-invoices",    label: "Invoices",            icon: "reports",  path: "/finance/invoices"     },
      { id: "fin-new",         label: "New Invoice",         icon: "plus",     path: "/finance/new"          },
      { id: "fin-payments",    label: "Payments",            icon: "dollar",   path: "/finance/payments"     },
      { id: "fin-expenses",    label: "Expenses",            icon: "dollar",   path: "/finance/expenses"     },
      { id: "fin-reports",     label: "Financial Reports",   icon: "trending", path: "/finance/reports"      },
    ],
  },
  {
    id: "projects",  label: "Project Management",    icon: "projects",  badge: "8",
    children: [
      { id: "proj-all",        label: "All Projects",        icon: "projects", path: "/projects"             },
      { id: "proj-new",        label: "New Project",         icon: "plus",     path: "/projects/new"         },
      { id: "proj-kanban",     label: "Kanban Board",        icon: "kanban",   path: "/projects/kanban"      },
      { id: "proj-gantt",      label: "Gantt / Timeline",    icon: "gantt",    path: "/projects/gantt"       },
      { id: "proj-tasks",      label: "Tasks",               icon: "task",     path: "/projects/tasks"       },
      { id: "proj-milestones", label: "Milestones",          icon: "milestone",path: "/projects/milestones"  },
      { id: "proj-team",       label: "Team Assignments",    icon: "users",    path: "/projects/team"        },
      { id: "proj-docs",       label: "Project Documents",   icon: "reports",  path: "/projects/documents"   },
    ],
  },
  {
    id: "reports",   label: "Reports",               icon: "reports",   badge: null,
    children: [
      { id: "rep-ops",         label: "Operations",          icon: "activity", path: "/reports/operations"   },
      { id: "rep-fin",         label: "Finance Summary",     icon: "dollar",   path: "/reports/finance"      },
      { id: "rep-custom",      label: "Custom Reports",      icon: "reports",  path: "/reports/custom"       },
    ],
  },
  {
    id: "settings",  label: "Settings",              icon: "settings",  badge: null, adminOnly: true,
    children: [
      { id: "set-general",     label: "General",             icon: "settings", path: "/settings/general"     },
      { id: "set-company",     label: "Company Profile",     icon: "profile",  path: "/settings/company"     },
      { id: "set-notif",       label: "Notifications",       icon: "bell",     path: "/settings/notifications"},
      { id: "set-integrations",label: "Integrations",        icon: "activity", path: "/settings/integrations" },
      { id: "set-audit",       label: "Audit Trail",         icon: "clock",    path: "/settings/audit"       },
    ],
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { id:1, title:"Climate Alert",       msg:"Vault B temperature spike",             time:"2h ago",  unread:true,  type:"warning" },
  { id:2, title:"Invoice Approved",    msg:"INV-8823 approved by finance",          time:"3h ago",  unread:true,  type:"success" },
  { id:3, title:"Vendor Renewal Due",  msg:"ArtShip Inc. contract expiring in 7d",  time:"5h ago",  unread:true,  type:"warning" },
  { id:4, title:"New Client Added",    msg:"Sotheby's London onboarded",            time:"6h ago",  unread:false, type:"info"    },
  { id:5, title:"Shipment Delivered",  msg:"SHP-2039 arrived at Geneva Hub",        time:"8h ago",  unread:false, type:"success" },
];

// ─── Mini Sparkline ───────────────────────────────────────────────────────────
const Sparkline = ({ data, up = true }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const h = 28, w = 72;
  const pts = data.map((v, i) => `${(i/(data.length-1))*w},${h-((v-min)/(max-min||1))*h}`).join(" ");
  return (
    <svg width={w} height={h} className="opacity-50">
      <polyline points={pts} fill="none" stroke={up ? "#10b981" : "#ef4444"} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
};

// ─── Shared UI helpers ────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    "In Progress": "bg-blue-100 text-blue-700",
    "Planning":    "bg-slate-100 text-slate-600",
    "On Hold":     "bg-amber-100 text-amber-700",
    "Overdue":     "bg-red-100 text-red-700",
    "Done":        "bg-emerald-100 text-emerald-700",
    "In Transit":  "bg-blue-100 text-blue-700",
    "Pending":     "bg-amber-100 text-amber-700",
    "Delayed":     "bg-red-100 text-red-700",
    "Delivered":   "bg-emerald-100 text-emerald-700",
    "Approved":    "bg-emerald-100 text-emerald-700",
    "Paid":        "bg-emerald-100 text-emerald-700",
    "Sent":        "bg-blue-100 text-blue-700",
    "Draft":       "bg-slate-100 text-slate-600",
    "Normal":      "bg-emerald-100 text-emerald-700",
    "Alert":       "bg-red-100 text-red-700",
    "Warning":     "bg-amber-100 text-amber-700",
  };
  return <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${map[status] || "bg-slate-100 text-slate-600"}`}>{status}</span>;
};

const KpiCard = ({ label, value, change, up, icon, colorSet, spark }) => (
  <div className={`${colorSet.bg} border ${colorSet.border} rounded-2xl p-4 hover:shadow-md transition-shadow`}>
    <div className="flex items-start justify-between mb-2">
      <div className={`w-9 h-9 rounded-xl ${colorSet.icon} flex items-center justify-center`}>
        <Icon d={IC[icon] || IC.activity} size={17} />
      </div>
      {spark && <Sparkline data={spark} up={up} />}
    </div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    {change && <div className={`mt-1 text-[10px] font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>{change} vs last month</div>}
  </div>
);

const COLORS = {
  blue:   { bg:"bg-blue-50",   border:"border-blue-200",   icon:"bg-blue-100 text-blue-600"    },
  amber:  { bg:"bg-amber-50",  border:"border-amber-200",  icon:"bg-amber-100 text-amber-600"  },
  green:  { bg:"bg-emerald-50",border:"border-emerald-200",icon:"bg-emerald-100 text-emerald-600"},
  red:    { bg:"bg-red-50",    border:"border-red-200",    icon:"bg-red-100 text-red-600"      },
  purple: { bg:"bg-purple-50", border:"border-purple-200", icon:"bg-purple-100 text-purple-600"},
  teal:   { bg:"bg-teal-50",   border:"border-teal-200",   icon:"bg-teal-100 text-teal-600"    },
  indigo: { bg:"bg-indigo-50", border:"border-indigo-200", icon:"bg-indigo-100 text-indigo-600"},
  orange: { bg:"bg-orange-50", border:"border-orange-200", icon:"bg-orange-100 text-orange-600"},
};

const SectionCard = ({ title, action, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
      <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
      {action && <button className="text-xs text-blue-600 font-medium hover:underline">{action}</button>}
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// ─── DASHBOARDS ───────────────────────────────────────────────────────────────

// 1. System Administrator ─────────────────────────────────────────────────────
function DashSysAdmin() {
  const kpis = [
    { label:"Active Consignments", value:"248", change:"+12%", up:true,  icon:"package",   color:COLORS.blue,   spark:[20,25,18,30,28,35,40,38,45] },
    { label:"In Transit",          value:"34",  change:"+5%",  up:true,  icon:"transport", color:COLORS.amber,  spark:[10,12,15,11,14,16,13,17,18] },
    { label:"In Storage",          value:"183", change:"-3%",  up:false, icon:"warehouse", color:COLORS.green,  spark:[50,48,52,47,49,51,46,48,47] },
    { label:"Pending Invoices",    value:"17",  change:"+8%",  up:true,  icon:"finance",   color:COLORS.red,    spark:[5,7,6,8,9,10,8,11,13,15]   },
    { label:"Active Projects",     value:"21",  change:"+3%",  up:true,  icon:"projects",  color:COLORS.indigo, spark:[12,14,13,16,15,17,16,19,21] },
    { label:"Monthly Revenue",     value:"$86k",change:"+18%", up:true,  icon:"dollar",    color:COLORS.teal,   spark:[60,65,70,68,72,78,75,82,90] },
  ];
  const activity = [
    { type:"shipment", msg:"SHP-2041 departed for New York",              time:"2m ago",  status:"info"    },
    { type:"invoice",  msg:"INV-8823 approved — $12,400",                 time:"15m ago", status:"success" },
    { type:"crating",  msg:"Crating order CR-0991 completed",             time:"1h ago",  status:"success" },
    { type:"warehouse",msg:"Climate alert in Vault B — temperature spike",time:"2h ago",  status:"warning" },
    { type:"project",  msg:"PRJ-044 milestone 'Packing Complete' reached",time:"3h ago",  status:"success" },
    { type:"vendor",   msg:"Vendor contract renewal due: ArtShip Inc.",   time:"5h ago",  status:"warning" },
  ];
  const aClr = { success:"bg-emerald-100 text-emerald-700 border-emerald-200", warning:"bg-amber-100 text-amber-700 border-amber-200", info:"bg-blue-100 text-blue-700 border-blue-200" };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((k,i)=><KpiCard key={i} label={k.label} value={k.value} change={k.change} up={k.up} icon={k.icon} colorSet={k.color} spark={k.spark}/>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <SectionCard title="Recent Activity" action="View all">
            <div className="divide-y divide-slate-50 -mx-4 -mb-4">
              {activity.map((a,i)=>(
                <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50/60">
                  <span className={`mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold border flex-shrink-0 ${aClr[a.status]}`}>{a.type.toUpperCase()}</span>
                  <p className="flex-1 text-xs text-slate-700 font-medium">{a.msg}</p>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
        <div className="space-y-5">
          <SectionCard title="Warehouse Occupancy">
            {[["Vault A – Fine Art",72,"bg-blue-500"],["Vault B – Sculptures",55,"bg-purple-500"],["Vault C – Photography",91,"bg-red-500"],["Cold Store",34,"bg-teal-500"]].map(([n,p,c],i)=>(
              <div key={i} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{n}</span>
                  <span className={`font-bold ${p>85?"text-red-600":"text-slate-700"}`}>{p}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2"><div className={`${c} h-2 rounded-full`} style={{width:`${p}%`}}/></div>
              </div>
            ))}
          </SectionCard>
          <SectionCard title="Pending Tasks">
            {[["Review Vault B climate alert","High","Today"],["Approve INV-8824 payment","High","Today"],["Renew ArtShip contract","Medium","In 7 days"],["Review overdue task PRJ-0041","High","Today"]].map(([t,p,d],i)=>(
              <div key={i} className="flex items-start gap-2 mb-2.5">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${p==="High"?"bg-red-500":p==="Medium"?"bg-amber-500":"bg-slate-300"}`}/>
                <div><p className="text-xs text-slate-700">{t}</p><span className="text-[10px] text-slate-400">{d}</span></div>
              </div>
            ))}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// 2. Executive Director ────────────────────────────────────────────────────────
function DashExecutive() {
  const kpis = [
    { label:"Monthly Revenue",  value:"$86k", change:"+18%", up:true,  icon:"dollar",    color:COLORS.teal,   spark:[60,65,70,68,72,78,75,82,90] },
    { label:"Active Projects",  value:"21",   change:"+3%",  up:true,  icon:"projects",  color:COLORS.blue,   spark:[12,14,13,16,15,17,16,19,21] },
    { label:"In Transit",       value:"34",   change:"+5%",  up:true,  icon:"transport", color:COLORS.amber,  spark:[10,12,15,11,14,16,13,17,18] },
    { label:"Pending Approvals",value:"8",    change:"+2",   up:false, icon:"inbox",     color:COLORS.red,    spark:[4,5,6,5,7,6,8,7,8]         },
  ];
  const moduleHealth = [
    { label:"Clients",   id:"clients",   status:"Normal",  detail:"94 active clients",        icon:"clients"  },
    { label:"Vendors",   id:"vendors",   status:"Normal",  detail:"12 active contracts",       icon:"vendors"  },
    { label:"Projects",  id:"projects",  status:"Warning", detail:"5 overdue tasks",           icon:"projects" },
    { label:"Finance",   id:"finance",   status:"Warning", detail:"3 overdue invoices",        icon:"finance"  },
    { label:"Warehouse", id:"warehouse", status:"Alert",   detail:"2 climate alerts",          icon:"warehouse"},
    { label:"Transport", id:"transport", status:"Normal",  detail:"34 active shipments",       icon:"transport"},
    { label:"Crating",   id:"crating",   status:"Normal",  detail:"8 active orders",           icon:"crating"  },
  ];
  const approvals = [
    { ref:"INV-8825", module:"Finance",   desc:"Christie's London payment",         amount:"$24,500", by:"Finance Mgr",   urgent:true  },
    { ref:"PRJ-041",  module:"Projects",  desc:"Budget overrun approval request",   amount:"+$15,000",by:"Project Mgr",   urgent:true  },
    { ref:"SHP-2040", module:"Transport", desc:"Emergency route change Geneva",     amount:"—",       by:"Transport Mgr", urgent:true  },
    { ref:"EXP-089",  module:"Finance",   desc:"Climate Control Maintenance",       amount:"$1,200",  by:"Finance Mgr",   urgent:false },
    { ref:"CR-0992",  module:"Crating",   desc:"Urgent crating for Louvre",         amount:"$4,500",  by:"Crating Mgr",   urgent:false },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k,i)=><KpiCard key={i} label={k.label} value={k.value} change={k.change} up={k.up} icon={k.icon} colorSet={k.color} spark={k.spark}/>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Approval Queue */}
          <SectionCard title="Approval Queue" action="View all">
            <div className="space-y-2 -mx-4 -mb-4">
              {approvals.map((a,i)=>(
                <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.urgent?"bg-red-500":"bg-amber-400"}`}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{a.ref}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{a.module}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{a.desc} · via {a.by}</p>
                  </div>
                  {a.amount !== "—" && <span className="text-xs font-bold text-slate-700 flex-shrink-0">{a.amount}</span>}
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button className="px-2.5 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors">Approve</button>
                    <button className="px-2.5 py-1 text-[10px] font-bold bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
          {/* Financial Summary Placeholder */}
          <SectionCard title="Revenue vs Expenses — Last 6 Months">
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl" style={{height:130}}>
              <div className="absolute inset-0 flex items-end justify-around px-4 pb-4 gap-3">
                {[{m:"Nov",rev:68,exp:41},{m:"Dec",rev:74,exp:38},{m:"Jan",rev:62,exp:44},{m:"Feb",rev:79,exp:40},{m:"Mar",rev:83,exp:43},{m:"Apr",rev:86,exp:38}].map((d,i)=>(
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-full flex gap-0.5 items-end" style={{height:80}}>
                      <div className="flex-1 bg-teal-400 rounded-t-sm opacity-80" style={{height:`${(d.rev/90)*80}px`}}/>
                      <div className="flex-1 bg-red-300 rounded-t-sm opacity-70" style={{height:`${(d.exp/90)*80}px`}}/>
                    </div>
                    <span className="text-[9px] text-slate-500 font-medium">{d.m}</span>
                  </div>
                ))}
              </div>
              <div className="absolute top-2 right-3 flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-teal-400"/>Revenue</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-300"/>Expenses</span>
              </div>
            </div>
          </SectionCard>
        </div>
        {/* Module Health */}
        <div>
          <SectionCard title="Module Health">
            <div className="space-y-2 -mx-4 -mb-4">
              {moduleHealth.map((m,i)=>(
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50/60 border-b border-slate-50 last:border-0">
                  <Icon d={IC[m.icon]||IC.activity} size={15} className="text-slate-400 flex-shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700">{m.label}</p>
                    <p className="text-[10px] text-slate-400 truncate">{m.detail}</p>
                  </div>
                  <StatusBadge status={m.status}/>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// 3. Project Manager ───────────────────────────────────────────────────────────
function DashProjectManager() {
  const kpis = [
    { label:"Active Projects", value:"21",  change:"+3%",  up:true,  icon:"projects", color:COLORS.blue,  spark:[12,14,13,16,15,17,16,19,21] },
    { label:"Open Tasks",      value:"47",  change:"+5",   up:false, icon:"task",     color:COLORS.amber, spark:[40,42,38,44,45,47,43,46,47] },
    { label:"Overdue Tasks",   value:"5",   change:"+2",   up:false, icon:"alert",    color:COLORS.red,   spark:[2,3,3,4,3,5,4,5,5]         },
    { label:"Team Members",    value:"12",  change:"",     up:true,  icon:"users",    color:COLORS.green, spark:[10,10,11,11,12,12,12,12,12] },
  ];
  const projects = [
    { id:"PRJ-044", name:"Louvre Installation",    client:"Louvre Museum",   status:"In Progress", pct:72, due:"20 Apr", priority:"High"   },
    { id:"PRJ-043", name:"NYC Gallery Move",        client:"Christie's",      status:"Planning",    pct:15, due:"30 Apr", priority:"Medium" },
    { id:"PRJ-042", name:"Dubai Art Fair Setup",    client:"DIFC",            status:"On Hold",     pct:45, due:"15 May", priority:"Low"    },
    { id:"PRJ-041", name:"Venice Biennale Prep",    client:"Private Collect.",status:"Overdue",     pct:88, due:"5 Apr",  priority:"High"   },
    { id:"PRJ-040", name:"Tate Modern Collection",  client:"Tate Museum",     status:"In Progress", pct:31, due:"1 May",  priority:"Medium" },
  ];
  const kanban = [
    { col:"To Do",      count:12, clr:"bg-slate-100 text-slate-600",   dot:"bg-slate-400"    },
    { col:"In Progress",count:18, clr:"bg-blue-100 text-blue-700",     dot:"bg-blue-500"     },
    { col:"Review",     count:9,  clr:"bg-amber-100 text-amber-700",   dot:"bg-amber-500"    },
    { col:"Done",       count:8,  clr:"bg-emerald-100 text-emerald-700",dot:"bg-emerald-500" },
  ];
  const milestones = [
    { project:"PRJ-044", name:"Final crating sign-off",     due:"Today",     status:"Overdue" },
    { project:"PRJ-043", name:"Client approval submission", due:"In 2 days", status:"Pending" },
    { project:"PRJ-041", name:"Delivery confirmation",      due:"3 days ago",status:"Overdue" },
    { project:"PRJ-040", name:"Insurance documentation",    due:"In 5 days", status:"Pending" },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k,i)=><KpiCard key={i} label={k.label} value={k.value} change={k.change} up={k.up} icon={k.icon} colorSet={k.color} spark={k.spark}/>)}
      </div>
      {/* Kanban Summary */}
      <div className="grid grid-cols-4 gap-3">
        {kanban.map((k,i)=>(
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 text-center hover:shadow-sm transition-shadow cursor-pointer">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${k.clr} text-xs font-bold mb-2`}>
              <span className={`w-2 h-2 rounded-full ${k.dot}`}/>{k.col}
            </div>
            <div className="text-2xl font-bold text-slate-800">{k.count}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">tasks</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Projects Table */}
        <div className="lg:col-span-2">
          <SectionCard title="Active Projects" action="View all">
            <div className="overflow-x-auto -mx-4 -mb-4">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-slate-100">
                  {["Project","Client","Status","Progress","Due","Priority"].map(h=>(
                    <th key={h} className="text-left px-4 py-2 text-slate-400 font-semibold">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {projects.map((p,i)=>(
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-800">{p.id}</div>
                        <div className="text-slate-500 text-[10px] truncate max-w-[130px]">{p.name}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{p.client}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status}/></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${p.status==="Overdue"?"bg-red-500":"bg-blue-500"}`} style={{width:`${p.pct}%`}}/></div>
                          <span className="text-slate-500">{p.pct}%</span>
                        </div>
                      </td>
                      <td className={`px-4 py-3 font-medium whitespace-nowrap ${p.status==="Overdue"?"text-red-600":"text-slate-600"}`}>{p.due}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.priority==="High"?"bg-red-100 text-red-700":p.priority==="Medium"?"bg-amber-100 text-amber-700":"bg-slate-100 text-slate-500"}`}>{p.priority}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
        {/* Milestones */}
        <div>
          <SectionCard title="Upcoming Milestones" action="View all">
            <div className="space-y-3 -mx-4 -mb-4">
              {milestones.map((m,i)=>(
                <div key={i} className="px-4 py-3 border-b border-slate-50 last:border-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 leading-snug">{m.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{m.project}</p>
                    </div>
                    <StatusBadge status={m.status}/>
                  </div>
                  <p className={`text-[10px] mt-1 font-medium ${m.status==="Overdue"?"text-red-600":"text-slate-500"}`}>{m.due}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// 4. Finance Manager ───────────────────────────────────────────────────────────
function DashFinanceManager() {
  const kpis = [
    { label:"Monthly Revenue",  value:"$86k",  change:"+18%", up:true,  icon:"dollar",     color:COLORS.teal,  spark:[60,65,70,68,72,78,75,82,90] },
    { label:"Pending Invoices", value:"17",    change:"+4",   up:false, icon:"inbox",      color:COLORS.amber, spark:[10,12,11,13,14,15,14,16,17] },
    { label:"Overdue Amount",   value:"$12.4k",change:"+2",   up:false, icon:"alert",      color:COLORS.red,   spark:[8,9,8,10,10,11,11,12,12]   },
    { label:"Monthly Expenses", value:"$34k",  change:"+3%",  up:false, icon:"creditCard", color:COLORS.purple,spark:[28,30,31,29,32,33,31,34,34] },
  ];
  const pipeline = [
    { stage:"Draft",    count:8,  clr:"bg-slate-100 text-slate-600" },
    { stage:"Sent",     count:12, clr:"bg-blue-100 text-blue-700"   },
    { stage:"Approved", count:7,  clr:"bg-indigo-100 text-indigo-700"},
    { stage:"Paid",     count:45, clr:"bg-emerald-100 text-emerald-700"},
    { stage:"Overdue",  count:3,  clr:"bg-red-100 text-red-700"     },
  ];
  const approvals = [
    { ref:"INV-8825", client:"Christie's London",  amount:"$24,500", due:"Today",    type:"Invoice"  },
    { ref:"INV-8826", client:"Sotheby's Paris",    amount:"$8,200",  due:"Tomorrow", type:"Invoice"  },
    { ref:"PMT-0241", client:"ArtShip Inc.",       amount:"$4,300",  due:"This week",type:"Payment"  },
    { ref:"EXP-0089", client:"Climate Maintenance",amount:"$1,200",  due:"This week",type:"Expense"  },
  ];
  const transactions = [
    { ref:"INV-8823", client:"Louvre Museum",   amount:"$12,400", status:"Approved", date:"8 Apr" },
    { ref:"INV-8822", client:"Christie's NY",   amount:"$31,000", status:"Paid",     date:"7 Apr" },
    { ref:"INV-8820", client:"Tate Museum",     amount:"$8,750",  status:"Paid",     date:"6 Apr" },
    { ref:"INV-8819", client:"Dubai Art Fair",  amount:"$19,200", status:"Overdue",  date:"1 Apr" },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k,i)=><KpiCard key={i} label={k.label} value={k.value} change={k.change} up={k.up} icon={k.icon} colorSet={k.color} spark={k.spark}/>)}
      </div>
      {/* Invoice Pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 text-sm mb-4">Invoice Pipeline</h3>
        <div className="flex items-center gap-1">
          {pipeline.map((s,i)=>(
            <div key={i} className="flex-1 text-center">
              <div className={`${s.clr} rounded-xl py-3 font-bold text-lg`}>{s.count}</div>
              <div className="text-[10px] text-slate-500 mt-1.5 font-medium">{s.stage}</div>
              {i < pipeline.length-1 && <div className="hidden"/>}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-3 gap-1">
          {pipeline.map((_,i)=>i<pipeline.length-1&&(
            <div key={i} className="flex-1 flex justify-center"><span className="text-slate-300 text-lg">→</span></div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Approval Queue */}
        <SectionCard title="Requires Your Approval" action="Approve all">
          <div className="space-y-2 -mx-4 -mb-4">
            {approvals.map((a,i)=>(
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">{a.ref}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{a.type}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{a.client} · Due: {a.due}</p>
                </div>
                <span className="text-sm font-bold text-slate-800 flex-shrink-0">{a.amount}</span>
                <button className="px-2.5 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 flex-shrink-0">Approve</button>
              </div>
            ))}
          </div>
        </SectionCard>
        {/* Recent Transactions */}
        <SectionCard title="Recent Transactions" action="View all">
          <div className="overflow-x-auto -mx-4 -mb-4">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-slate-100">{["Ref","Client","Amount","Status","Date"].map(h=><th key={h} className="text-left px-4 py-2 text-slate-400 font-semibold">{h}</th>)}</tr></thead>
              <tbody>
                {transactions.map((t,i)=>(
                  <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-bold text-slate-800">{t.ref}</td>
                    <td className="px-4 py-3 text-slate-600">{t.client}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{t.amount}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status}/></td>
                    <td className="px-4 py-3 text-slate-500">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// 5. Warehouse Manager ─────────────────────────────────────────────────────────
function DashWarehouseManager() {
  const kpis = [
    { label:"Total Items in Store", value:"183", change:"-3%",  up:false, icon:"box",     color:COLORS.blue,  spark:[190,188,186,185,184,183,183,183,183] },
    { label:"Check-ins Today",      value:"5",   change:"",     up:true,  icon:"check",   color:COLORS.green, spark:[3,4,3,5,4,6,4,5,5] },
    { label:"Check-outs Today",     value:"3",   change:"",     up:true,  icon:"package", color:COLORS.amber, spark:[2,3,2,4,3,3,4,3,3] },
    { label:"Active Alerts",        value:"2",   change:"+1",   up:false, icon:"alert",   color:COLORS.red,   spark:[0,1,0,1,1,1,2,1,2] },
  ];
  const vaults = [
    { name:"Vault A – Fine Art",    pct:72, temp:"18°C", hum:"45%", status:"Normal"  },
    { name:"Vault B – Sculptures",  pct:55, temp:"22°C", hum:"48%", status:"Warning" },
    { name:"Vault C – Photography", pct:91, temp:"17°C", hum:"44%", status:"Normal"  },
    { name:"Cold Store",            pct:34, temp:"8°C",  hum:"50%", status:"Normal"  },
  ];
  const pending = [
    { ref:"CHK-IN-221",  item:"3x Paintings – Louvre",    type:"Check In",  by:"PRJ-044",  due:"Today",    priority:"High"   },
    { ref:"CHK-OUT-189", item:"2x Sculptures – SHP-2042", type:"Check Out", by:"TM Office",due:"Tomorrow", priority:"Medium" },
    { ref:"CHK-IN-220",  item:"1x Photography Series",    type:"Check In",  by:"PRJ-043",  due:"Tomorrow", priority:"Medium" },
    { ref:"MOV-045",     item:"Vault A → Vault C reloc.", type:"Move",      by:"Mgmt",     due:"Fri",      priority:"Low"    },
  ];
  const recent = [
    { ref:"CHK-IN-219",  item:"Monet – Water Lilies",       type:"Check In",  time:"10:30 AM", by:"J.Smith" },
    { ref:"CHK-OUT-188", item:"Warhol – Print Series (x4)", type:"Check Out", time:"9:15 AM",  by:"R.Jones" },
    { ref:"CHK-IN-218",  item:"Bronze Sculpture – Anon",    type:"Check In",  time:"Yesterday",by:"M.Patel" },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k,i)=><KpiCard key={i} label={k.label} value={k.value} change={k.change} up={k.up} icon={k.icon} colorSet={k.color} spark={k.spark}/>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Vault Status + Climate */}
        <SectionCard title="Vault Status & Climate Monitoring">
          <div className="space-y-3 -mx-4 -mb-4">
            {vaults.map((v,i)=>(
              <div key={i} className={`px-4 py-3 border-b border-slate-50 last:border-0 ${v.status==="Warning"?"bg-amber-50/50":v.status==="Alert"?"bg-red-50/50":""}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-800">{v.name}</span>
                  <StatusBadge status={v.status}/>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                  <div className={`h-2 rounded-full ${v.pct>85?"bg-red-500":v.pct>70?"bg-amber-500":"bg-blue-500"}`} style={{width:`${v.pct}%`}}/>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1"><Icon d={IC.thermo} size={11}/>{v.temp}</span>
                  <span className="flex items-center gap-1"><Icon d={IC.droplet} size={11}/>{v.hum} RH</span>
                  <span className="font-semibold text-slate-700">{v.pct}% occupied</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        {/* Pending Requests */}
        <div className="space-y-5">
          <SectionCard title="Pending Requests" action="View all">
            <div className="space-y-2 -mx-4 -mb-4">
              {pending.map((p,i)=>(
                <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full ${p.priority==="High"?"bg-red-500":p.priority==="Medium"?"bg-amber-500":"bg-slate-300"}`}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{p.type}</span>
                      <span className="text-xs text-slate-400">{p.ref}</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium truncate mt-0.5">{p.item}</p>
                    <p className="text-[10px] text-slate-400">{p.by} · Due: {p.due}</p>
                  </div>
                  <button className="px-2 py-1 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex-shrink-0">Action</button>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Recent Movements">
            {recent.map((r,i)=>(
              <div key={i} className="flex items-center gap-2 mb-2.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${r.type==="Check In"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>{r.type}</span>
                <div className="flex-1 min-w-0"><p className="text-xs text-slate-700 truncate">{r.item}</p><p className="text-[10px] text-slate-400">{r.time} · {r.by}</p></div>
              </div>
            ))}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// 6. Transport Manager ─────────────────────────────────────────────────────────
function DashTransportManager() {
  const kpis = [
    { label:"Active Shipments", value:"34",  change:"+5%",  up:true,  icon:"transport", color:COLORS.blue,  spark:[28,29,30,29,31,32,31,33,34] },
    { label:"In Transit",       value:"28",  change:"+3",   up:true,  icon:"map",       color:COLORS.teal,  spark:[22,24,23,25,25,26,27,27,28] },
    { label:"Delivered Today",  value:"6",   change:"",     up:true,  icon:"check",     color:COLORS.green, spark:[3,4,5,3,6,4,5,6,6]         },
    { label:"Delayed",          value:"3",   change:"+1",   up:false, icon:"alert",     color:COLORS.red,   spark:[1,2,1,2,2,3,2,3,3]         },
  ];
  const shipments = [
    { ref:"SHP-2041", origin:"London, UK",    dest:"New York, US",   courier:"ArtShip Inc.",  status:"In Transit",  eta:"12 Apr", val:"$280k" },
    { ref:"SHP-2042", origin:"Paris, France", dest:"Dubai, UAE",     courier:"FineArt Cargo", status:"Pending",     eta:"14 Apr", val:"$95k"  },
    { ref:"SHP-2040", origin:"Geneva, CH",    dest:"Tokyo, Japan",   courier:"SecureArt",     status:"Delayed",     eta:"8 Apr",  val:"$1.2M" },
    { ref:"SHP-2039", origin:"New York, US",  dest:"Geneva, CH",     courier:"ArtShip Inc.",  status:"Delivered",   eta:"9 Apr",  val:"$340k" },
    { ref:"SHP-2043", origin:"Berlin, DE",    dest:"London, UK",     courier:"EuroArt Exp.",  status:"In Transit",  eta:"11 Apr", val:"$62k"  },
  ];
  const alerts = [
    { ref:"SHP-2040", reason:"Customs hold at Geneva Airport",  severity:"High",   since:"2 days" },
    { ref:"SHP-2038", reason:"Weather delay — North Atlantic",  severity:"Medium", since:"1 day"  },
    { ref:"SHP-2037", reason:"Driver change required — London", severity:"Low",    since:"3h"     },
  ];
  const couriers = [
    { name:"ArtShip Inc.",    active:3, delayed:0, rating:"98%", clr:"bg-emerald-100 text-emerald-700" },
    { name:"FineArt Cargo",   active:2, delayed:0, rating:"95%", clr:"bg-emerald-100 text-emerald-700" },
    { name:"SecureArt",       active:1, delayed:1, rating:"89%", clr:"bg-red-100 text-red-700"         },
    { name:"EuroArt Express", active:2, delayed:0, rating:"97%", clr:"bg-emerald-100 text-emerald-700" },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k,i)=><KpiCard key={i} label={k.label} value={k.value} change={k.change} up={k.up} icon={k.icon} colorSet={k.color} spark={k.spark}/>)}
      </div>
      {/* Active Shipments */}
      <SectionCard title="Active Shipments" action="View all">
        <div className="overflow-x-auto -mx-4 -mb-4">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-slate-100">{["Shipment","Origin","Destination","Courier","Status","ETA","Value"].map(h=><th key={h} className="text-left px-4 py-2 text-slate-400 font-semibold whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {shipments.map((s,i)=>(
                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-bold text-slate-800">{s.ref}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{s.origin}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{s.dest}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{s.courier}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status}/></td>
                  <td className={`px-4 py-3 font-medium whitespace-nowrap ${s.status==="Delayed"?"text-red-600":"text-slate-600"}`}>{s.eta}</td>
                  <td className="px-4 py-3 font-bold text-slate-700">{s.val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Delay Alerts */}
        <SectionCard title="Delay Alerts">
          <div className="space-y-3 -mx-4 -mb-4">
            {alerts.map((a,i)=>(
              <div key={i} className={`px-4 py-3 border-b border-slate-50 last:border-0 flex items-start gap-3 ${a.severity==="High"?"bg-red-50/40":a.severity==="Medium"?"bg-amber-50/40":""}`}>
                <Icon d={IC.alert} size={15} className={`flex-shrink-0 mt-0.5 ${a.severity==="High"?"text-red-500":a.severity==="Medium"?"text-amber-500":"text-slate-400"}`}/>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-800">{a.ref}</span>
                  <p className="text-xs text-slate-600 mt-0.5">{a.reason}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Since {a.since}</p>
                </div>
                <button className="px-2.5 py-1 text-[10px] font-bold bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex-shrink-0">Resolve</button>
              </div>
            ))}
          </div>
        </SectionCard>
        {/* Courier Status */}
        <SectionCard title="Courier Performance">
          <div className="space-y-2 -mx-4 -mb-4">
            {couriers.map((c,i)=>(
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 last:border-0">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Icon d={IC.transport} size={14} className="text-slate-500"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800">{c.name}</p>
                  <p className="text-[10px] text-slate-400">{c.active} active · {c.delayed} delayed</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.clr}`}>{c.rating}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── Quick Actions per role ───────────────────────────────────────────────────
const QUICK_ACTIONS = {
  system_admin:      [
    { label:"New Consignment", icon:"plus",     clr:"bg-blue-600"    },
    { label:"Add Client",      icon:"clients",  clr:"bg-indigo-600"  },
    { label:"New Shipment",    icon:"transport",clr:"bg-amber-600"   },
    { label:"Create Invoice",  icon:"finance",  clr:"bg-emerald-600" },
    { label:"New Project",     icon:"projects", clr:"bg-purple-600"  },
    { label:"Add Vendor",      icon:"vendors",  clr:"bg-rose-600"    },
  ],
  executive:         [
    { label:"Approval Queue",  icon:"inbox",    clr:"bg-red-600"     },
    { label:"Financial Report",icon:"trending", clr:"bg-teal-600"    },
    { label:"Module Status",   icon:"activity", clr:"bg-purple-600"  },
    { label:"Export Summary",  icon:"reports",  clr:"bg-slate-600"   },
  ],
  projects_manager:  [
    { label:"New Project",     icon:"plus",     clr:"bg-blue-600"    },
    { label:"Add Task",        icon:"task",     clr:"bg-indigo-600"  },
    { label:"Assign Team",     icon:"users",    clr:"bg-amber-600"   },
    { label:"View Gantt",      icon:"gantt",    clr:"bg-emerald-600" },
    { label:"Add Milestone",   icon:"milestone",clr:"bg-purple-600"  },
  ],
  finance_manager:   [
    { label:"New Invoice",     icon:"plus",     clr:"bg-emerald-600" },
    { label:"Record Payment",  icon:"creditCard",clr:"bg-teal-600"   },
    { label:"Approve Queue",   icon:"check",    clr:"bg-blue-600"    },
    { label:"Add Expense",     icon:"dollar",   clr:"bg-amber-600"   },
    { label:"Finance Report",  icon:"reports",  clr:"bg-purple-600"  },
  ],
  warehouse_manager: [
    { label:"Check In",        icon:"check",    clr:"bg-emerald-600" },
    { label:"Check Out",       icon:"package",  clr:"bg-amber-600"   },
    { label:"Add Location",    icon:"map",      clr:"bg-blue-600"    },
    { label:"Climate Report",  icon:"thermo",   clr:"bg-purple-600"  },
  ],
  transport_manager: [
    { label:"New Shipment",    icon:"plus",     clr:"bg-blue-600"    },
    { label:"Track All",       icon:"map",      clr:"bg-teal-600"    },
    { label:"Assign Courier",  icon:"users",    clr:"bg-amber-600"   },
    { label:"Delay Report",    icon:"alert",    clr:"bg-red-600"     },
  ],
};
const getQuickActions = (role) => QUICK_ACTIONS[role] || QUICK_ACTIONS.system_admin;

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
// ─── VEHICLE RUN PLANNER — embedded (no standalone header) ───────────────────
// ═══════════════════════════════════════════════════════════════════════════════

const VRP_VEHICLES = [
  { id: "ASBR",     label: "ASBR"      },
  { id: "BDE2938",  label: "BDE 2938"  },
  { id: "CH073",    label: "CH073"     },
  { id: "CHI123",   label: "CHI123"    },
  { id: "CHICAGO12",label: "CHICAGO12" },
  { id: "CHIRAS",   label: "CHIRAS"    },
];

const VRP_HOURS = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM – 7 PM

const VRP_STATUS_COLORS = {
  Tentative:       "#f5e6a3",
  Confirmed:       "#4a8c3f",
  InTerminal:      "#8b6914",
  Loaded:          "#e88ccd",
  PickedUp:        "#b0b0b0",
  Unloaded:        "#b3e0f2",
  OutForDelivery:  "#c4c4c4",
  Delivered:       "#e04040",
  CouldNotPickup:  "#ff8c69",
  CouldNotDeliver: "#4040c0",
};

const VRP_RUN_STATUS = {
  Created:       "#d4a843",
  InProgress:    "#4a8c3f",
  Closed:        "#6b5b3a",
  TripCompleted: "#7b2d8b",
  Completed:     "#e04040",
};

const VRP_ACTIVITY_COLORS = {
  Pickup:      "#8bc78b",
  Delivery:    "#e8b44c",
  Load:        "#d4e8a0",
  Unload:      "#f0c878",
  SiteService: "#a8d4f0",
};

const VRP_INITIAL_JOBS = [
  {
    id: "18951-36035", runId: "12866", vehicleId: "ASBR",
    startHour: 8, duration: 2, volume: 11688, area: 858,
    status: "Confirmed", runStatus: "Created", pieces: 4,
    stops: [
      { name: "TEXAS RANGER HALL OF FAME AND MUSEUM", address: "TEST ADDRESS, CHICAGO, IL", type: "Pickup",   time: "10 AM" },
      { name: "Storage Service, Chicago",                                                    type: "Delivery", time: "12 PM" },
    ],
  },
  {
    id: "18949-36033", runId: "12866", vehicleId: "BDE2938",
    startHour: 8, duration: 2, volume: 0, area: 0,
    status: "Confirmed", runStatus: "InProgress", pieces: 0,
    stops: [
      { name: "TEXAS RANGER HALL OF FAME AND MUSEUM", address: "TEST ADDRESS, CHICAGO, IL", type: "Pickup",   time: "10 AM" },
      { name: "Storage Service, Chicago",                                                    type: "Delivery", time: "12 PM" },
    ],
  },
  {
    id: "20100-37200", runId: "12870", vehicleId: null,
    startHour: 10, duration: 3, volume: 5400, area: 320,
    status: "Tentative", runStatus: "Created", pieces: 2,
    stops: [
      { name: "O'HARE FREIGHT TERMINAL", address: "CARGO AREA, CHICAGO, IL", type: "Pickup",   time: "10 AM" },
      { name: "Downtown Warehouse",                                            type: "Delivery", time: "1 PM"  },
    ],
  },
  {
    id: "20250-37400", runId: "12872", vehicleId: "CHI123",
    startHour: 12, duration: 2, volume: 3200, area: 180,
    status: "Loaded", runStatus: "InProgress", pieces: 6,
    stops: [
      { name: "MIDWAY CARGO HUB", address: "SOUTH CICERO, CHICAGO, IL", type: "Load",     time: "12 PM" },
      { name: "North Side Distribution",                                  type: "Delivery", time: "2 PM"  },
    ],
  },
];

const VRP_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const VRP_DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const vrpCalBtn  = { background:"none", border:"1px solid #ccc", borderRadius:3, cursor:"pointer", padding:"1px 6px", fontSize:11 };
const vrpSelectStyle = { width:"100%", padding:"4px 6px", fontSize:11, border:"1px solid #ccc", borderRadius:4 };
const vrpSummaryHeader = { background:"#e8ecf1", fontWeight:700, padding:4, fontSize:11 };
const vrpSummaryVal    = { padding:4, fontWeight:700, fontSize:13, textAlign:"center" };
const vrpNavBtn  = { background:"none", border:"1px solid #aaa", borderRadius:3, cursor:"pointer", padding:"2px 8px", fontSize:12 };

function VrpMiniCalendar({ selectedDate, onSelect }) {
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());
  const [viewYear,  setViewYear]  = useState(selectedDate.getFullYear());

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevDays    = new Date(viewYear, viewMonth, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++)      cells.push({ day: prevDays - firstDay + i + 1, outside: true });
  for (let i = 1; i <= daysInMonth; i++)  cells.push({ day: i, outside: false });
  const rem = 42 - cells.length;
  for (let i = 1; i <= rem; i++)          cells.push({ day: i, outside: true });

  const prev = () => { if (viewMonth===0) { setViewMonth(11); setViewYear(viewYear-1); } else setViewMonth(viewMonth-1); };
  const next = () => { if (viewMonth===11){ setViewMonth(0);  setViewYear(viewYear+1); } else setViewMonth(viewMonth+1); };
  const isSel = (c) => !c.outside && c.day===selectedDate.getDate() && viewMonth===selectedDate.getMonth() && viewYear===selectedDate.getFullYear();

  return (
    <div style={{ fontSize:11, userSelect:"none" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
        <button onClick={prev} style={vrpCalBtn}>◀</button>
        <span style={{ fontWeight:700, fontSize:12 }}>{VRP_MONTHS[viewMonth]} {viewYear}</span>
        <button onClick={next} style={vrpCalBtn}>▶</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1 }}>
        {VRP_DAYS.map(d=><div key={d} style={{ textAlign:"center", fontWeight:700, fontSize:10, color:"#666", padding:2 }}>{d}</div>)}
        {cells.map((c,i)=>(
          <div key={i} onClick={()=>!c.outside&&onSelect(new Date(viewYear,viewMonth,c.day))}
            style={{
              textAlign:"center", padding:"3px 0", cursor:c.outside?"default":"pointer", borderRadius:3,
              color: c.outside?"#bbb":(i%7===0?"#c00":i%7===6?"#07a":"#333"),
              background: isSel(c)?"#3b82f6":"transparent",
              fontWeight: isSel(c)?700:400,
              ...(isSel(c)?{color:"#fff"}:{}),
            }}>{c.day}</div>
        ))}
      </div>
      <div style={{ textAlign:"center", marginTop:4 }}>
        <button onClick={()=>onSelect(new Date())} style={{ ...vrpCalBtn, fontSize:11, padding:"2px 12px" }}>Today</button>
      </div>
    </div>
  );
}

function VrpJobCard({ job, isDragging, onDragStart }) {
  const sc = VRP_STATUS_COLORS[job.status] || "#ccc";
  const rc = VRP_RUN_STATUS[job.runStatus] || "#ccc";
  return (
    <div draggable onDragStart={e=>onDragStart(e,job.id)}
      style={{
        background:`linear-gradient(135deg,${sc}ee,${sc}bb)`,
        border:`2px solid ${sc==="#f5e6a3"?"#c4a832":sc}`,
        borderLeft:`5px solid ${rc}`,
        borderRadius:4, padding:"6px 8px", marginBottom:4,
        cursor:"grab", opacity:isDragging?0.4:1, fontSize:11,
        boxShadow:"0 1px 3px rgba(0,0,0,0.15)", minHeight:80, position:"relative", overflow:"hidden",
      }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
        <span style={{ fontWeight:800, fontSize:12, color:"#1a3a5c" }}>{job.id}</span>
        <span style={{ fontSize:10, background:"rgba(255,255,255,0.6)", padding:"1px 5px", borderRadius:8 }}>({job.pieces})</span>
      </div>
      <div style={{ fontSize:10, color:"#555", marginBottom:2 }}>{job.startHour}:00 – {job.startHour+job.duration}:00</div>
      {job.stops.map((s,i)=>(
        <div key={i} style={{
          fontSize:9, padding:"3px 4px", marginTop:3, borderRadius:3,
          background:VRP_ACTIVITY_COLORS[s.type]||"#eee",
          borderLeft:`3px solid ${VRP_ACTIVITY_COLORS[s.type]?"#0006":"#999"}`, lineHeight:1.3,
        }}>
          <div style={{ fontWeight:700 }}>{s.name}</div>
          {s.address&&<div style={{ color:"#555" }}>{s.address}</div>}
          <div style={{ color:"#333", fontWeight:600 }}>{s.time}</div>
        </div>
      ))}
      <div style={{ display:"flex", gap:6, marginTop:4, fontSize:9, color:"#444" }}>
        <span>Vol: {job.volume.toLocaleString()}</span>
        <span>Area: {job.area}</span>
      </div>
    </div>
  );
}

function VrpScheduleColumn({ title, titleColor, runId, vehicleId, jobs, draggingId, onDragStart, onDrop, onDragOver }) {
  const [isOver, setIsOver] = useState(false);
  return (
    <div onDragOver={e=>{onDragOver(e);setIsOver(true);}} onDragLeave={()=>setIsOver(false)}
      onDrop={e=>{onDrop(e,vehicleId);setIsOver(false);}}
      style={{ width:210, minWidth:210, borderRight:"1px solid #ddd", display:"flex", flexDirection:"column",
        background:isOver?"#e3f2fd":"#fafbfc", transition:"background 0.2s" }}>
      {/* Column header */}
      <div style={{ padding:"8px 6px", borderBottom:"2px solid "+titleColor, textAlign:"center",
        background:"#fff", position:"sticky", top:0, zIndex:2 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          <span style={{ fontSize:16 }}>🚛</span>
          <span style={{ fontWeight:800, fontSize:13, color:titleColor }}>{title}</span>
        </div>
        {runId&&<div style={{ fontSize:10, color:"#888", marginTop:2 }}>Run # <span style={{ color:"#c0392b", fontWeight:700 }}>{runId}</span></div>}
        <div style={{ fontSize:10, color:"#888", marginTop:2 }}>
          {jobs.length} job{jobs.length!==1?"s":""} · Vol: {jobs.reduce((s,j)=>s+j.volume,0).toLocaleString()}
        </div>
      </div>
      {/* Time grid */}
      <div style={{ flex:1, position:"relative" }}>
        {VRP_HOURS.map(h=>(
          <div key={h} style={{ height:60, borderBottom:"1px solid #eee", position:"relative" }}>
            <span style={{ position:"absolute", top:-7, left:4, fontSize:9, color:"#aaa" }}>
              {h>12?h-12:h}{h>=12?"PM":"AM"}
            </span>
          </div>
        ))}
        <div style={{ position:"absolute", top:0, left:0, right:0, padding:"0 4px" }}>
          {jobs.map(job=>(
            <div key={job.id} style={{ position:"absolute", top:(job.startHour-7)*60, left:4, right:4 }}>
              <VrpJobCard job={job} isDragging={draggingId===job.id} onDragStart={onDragStart}/>
            </div>
          ))}
        </div>
        {isOver&&(
          <div style={{ position:"absolute", inset:0, border:"2px dashed #3b82f6", borderRadius:6,
            background:"rgba(59,130,246,0.06)", pointerEvents:"none",
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:12, fontWeight:700, color:"#3b82f6", background:"#fff", padding:"2px 10px", borderRadius:10 }}>Drop here</span>
          </div>
        )}
      </div>
    </div>
  );
}

function VrpLegendRow({ map }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, fontSize:10 }}>
      {Object.entries(map).map(([k,v])=>(
        <div key={k} style={{ display:"flex", alignItems:"center", gap:4 }}>
          <div style={{ width:12, height:12, borderRadius:2, background:v, border:"1px solid #0002", flexShrink:0 }}/>
          {k.replace(/([A-Z])/g,' $1').trim()}
        </div>
      ))}
    </div>
  );
}

function VrpSection({ title, children }) {
  return (
    <div>
      <div style={{ fontSize:11, fontWeight:800, color:"#1a3a5c", borderBottom:"1px solid #ddd", paddingBottom:3, marginBottom:6 }}>{title}</div>
      {children}
    </div>
  );
}

// The embedded planner — NO standalone header, fills available height
function VehicleRunPlannerEmbedded() {
  const [jobs, setJobs]                 = useState(VRP_INITIAL_JOBS);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 8));
  const [scope, setScope]               = useState("All");
  const [region, setRegion]             = useState("Chicago");
  const [viewMode, setViewMode]         = useState("Day");
  const [draggingId, setDraggingId]     = useState(null);
  const [search, setSearch]             = useState("");

  const { useCallback } = window.React || { useCallback: (fn) => fn };

  const onDragStart = (e, jobId) => { setDraggingId(jobId); e.dataTransfer.setData("text/plain", jobId); };
  const onDragOver  = (e) => e.preventDefault();
  const onDrop      = (e, vehicleId) => {
    e.preventDefault();
    const jobId = e.dataTransfer.getData("text/plain");
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, vehicleId } : j));
    setDraggingId(null);
  };

  const unassigned = jobs.filter(j => j.vehicleId === null);
  const dateStr    = `${VRP_MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
  const totalVol   = unassigned.reduce((s,j)=>s+j.volume,0);
  const totalArea  = unassigned.reduce((s,j)=>s+j.area,0);

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#f0f2f5", fontFamily:"'Segoe UI',Tahoma,Geneva,Verdana,sans-serif", color:"#333" }}>

      {/* ── Toolbar (replaces old standalone header) ── */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"6px 14px", background:"#1a3a5c", borderBottom:"1px solid #0d2540", flexShrink:0 }}>
        {/* Date navigation */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button style={vrpNavBtn} onClick={()=>setSelectedDate(new Date(selectedDate.getTime()-86400000))}>◀</button>
          <span style={{ fontWeight:700, fontSize:13, color:"#fff" }}>{dateStr}</span>
          <button style={vrpNavBtn} onClick={()=>setSelectedDate(new Date(selectedDate.getTime()+86400000))}>▶</button>
        </div>
        {/* Search */}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search jobs…"
          style={{ padding:"5px 10px", border:"1px solid #2d5a8e", borderRadius:6, fontSize:11, width:160, background:"#fff" }}/>
        {/* View mode tabs */}
        <div style={{ display:"flex", gap:2 }}>
          {["Day","Work Week","Week","Month"].map(m=>(
            <button key={m} onClick={()=>setViewMode(m)}
              style={{ padding:"4px 12px", fontSize:11, fontWeight:600, border:"1px solid #aaa", borderRadius:3, cursor:"pointer",
                background:viewMode===m?"#c0392b":"rgba(255,255,255,0.15)", color:viewMode===m?"#fff":"#e0e8f0" }}>
              {m}
            </button>
          ))}
        </div>
        {/* Region select */}
        <select value={region} onChange={e=>setRegion(e.target.value)}
          style={{ ...vrpSelectStyle, width:120, background:"rgba(255,255,255,0.15)", color:"#fff", border:"1px solid #2d5a8e" }}>
          <option>Chicago</option><option>New York</option><option>Los Angeles</option>
        </select>
        {/* Scope radios */}
        <div style={{ display:"flex", gap:10, fontSize:11, color:"#cde" }}>
          {["All","Local","Interstate"].map(s=>(
            <label key={s} style={{ display:"flex", alignItems:"center", gap:3, cursor:"pointer" }}>
              <input type="radio" name="vrp-scope" value={s} checked={scope===s} onChange={()=>setScope(s)} style={{ accentColor:"#e8b44c" }}/>
              {s}
            </label>
          ))}
        </div>
        {/* Action buttons */}
        <div style={{ display:"flex", gap:6 }}>
          {[["#4a8c3f","Save"],["#c0392b","Cancel"],["#2980b9","Refresh"]].map(([c,l])=>(
            <button key={l} style={{ background:c, color:"#fff", border:"none", borderRadius:4,
              padding:"5px 14px", fontSize:11, fontWeight:700, cursor:"pointer" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── Body: sidebar + scheduler grid ── */}
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* Left sidebar */}
        <div style={{ width:210, background:"#fff", borderRight:"1px solid #ddd",
          padding:12, overflowY:"auto", flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>

          <VrpMiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate}/>

          <VrpSection title="Unassigned Summary">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", border:"1px solid #ddd", borderRadius:4, overflow:"hidden" }}>
              <div style={vrpSummaryHeader}>Jobs</div>
              <div style={vrpSummaryHeader}>Volume</div>
              <div style={vrpSummaryHeader}>Area</div>
              <div style={vrpSummaryVal}>{unassigned.length}</div>
              <div style={vrpSummaryVal}>{totalVol.toLocaleString()}</div>
              <div style={vrpSummaryVal}>{totalArea}</div>
            </div>
          </VrpSection>

          <VrpSection title="Booking Status"><VrpLegendRow map={VRP_STATUS_COLORS}/></VrpSection>
          <VrpSection title="Run Status"><VrpLegendRow map={VRP_RUN_STATUS}/></VrpSection>
          <VrpSection title="Activity"><VrpLegendRow map={VRP_ACTIVITY_COLORS}/></VrpSection>
        </div>

        {/* Scheduler grid */}
        <div style={{ flex:1, overflowX:"auto", overflowY:"auto" }}>
          <div style={{ display:"flex", minWidth:(VRP_VEHICLES.length+1)*210 }}>
            {/* Unassigned column */}
            <VrpScheduleColumn
              title="Not Assigned" titleColor="#999" vehicleId={null}
              jobs={unassigned.filter(j=>!search||j.id.toLowerCase().includes(search.toLowerCase()))}
              draggingId={draggingId} onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver}/>
            {/* Vehicle columns */}
            {VRP_VEHICLES.map(v=>{
              const vJobs = jobs.filter(j=>j.vehicleId===v.id).filter(j=>!search||j.id.toLowerCase().includes(search.toLowerCase()));
              return (
                <VrpScheduleColumn key={v.id}
                  title={v.label} titleColor="#4a8c3f"
                  runId={vJobs.length>0?vJobs[0].runId:null}
                  vehicleId={v.id} jobs={vJobs}
                  draggingId={draggingId} onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver}/>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
// ─── END VEHICLE RUN PLANNER ──────────────────────────────────────────────────

export default function AIMSMasterPage() {
  const [currentRole, setCurrentRole] = useState("system_admin");
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [mobileOpen,  setMobileOpen]    = useState(false);
  const [expanded,    setExpanded]      = useState({});
  const [activeItem,  setActiveItem]    = useState("dashboard");
  const [activePage,  setActivePage]    = useState("Dashboard");
  const [breadcrumbs, setBreadcrumbs]   = useState(["Dashboard"]);
  const [notifOpen,   setNotifOpen]     = useState(false);
  const [profileOpen, setProfileOpen]   = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [searchFocus, setSearchFocus]   = useState(false);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);
  const roleRef    = useRef(null);
  const unread     = NOTIFICATIONS.filter(n => n.unread).length;
  const roleDef    = ROLE_DEFS[currentRole];

  useEffect(() => {
    const h = (e) => {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (roleRef.current    && !roleRef.current.contains(e.target))    setRoleSwitcherOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Filter nav based on role
  const visibleNav = NAV_ITEMS.filter(item => {
    if (item.adminOnly) return currentRole === "system_admin";
    if (item.alwaysShow) return true;
    return getPerm(currentRole, item.id) > P.NONE;
  });

  const toggleMenu = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const handleNavClick = (item, parent) => {
    setActiveItem(item.id);
    setActivePage(item.label);
    setBreadcrumbs(parent ? [parent.label, item.label] : [item.label]);
    if (window.innerWidth < 768) setMobileOpen(false);
  };

  const handleRoleSwitch = (role) => {
    setCurrentRole(role);
    setRoleSwitcherOpen(false);
    setActiveItem("dashboard");
    setActivePage("Dashboard");
    setBreadcrumbs(["Dashboard"]);
    setExpanded({});
  };

  // ── Sidebar ─────────────────────────────────────────────────────────────────
  const renderSidebar = () => {
    const collapsed = !sidebarOpen && !mobileOpen;
    return (
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700/60 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <Icon d={IC.art} size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <div className="text-white font-bold text-lg leading-tight">AIMS</div>
              <div className="text-slate-400 text-[10px] uppercase tracking-widest leading-tight">Art Logistics</div>
            </div>
          )}
        </div>

        {/* Role Indicator Strip */}
        {!collapsed && (
          <div className={`mx-3 mt-3 px-3 py-2 rounded-xl flex items-center gap-2 ${roleDef.badge}`}>
            <Icon d={IC.shield} size={13} className="flex-shrink-0 opacity-80" />
            <div className="min-w-0">
              <div className="text-[10px] font-bold truncate">{roleDef.label}</div>
              {roleDef.module && <div className="text-[9px] opacity-70 capitalize">{roleDef.module} module</div>}
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {visibleNav.map(item => {
            const isActive   = activeItem === item.id || (item.children?.some(c => c.id === activeItem));
            const isExpanded = expanded[item.id];
            const perm       = getPerm(currentRole, item.id);
            const permBadge  = PERM_BADGES[perm];

            return (
              <div key={item.id}>
                <div className={`flex items-center rounded-xl transition-all duration-150 relative
                  ${isActive
                    ? "bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/20"
                    : "hover:bg-slate-700/60"}`}
                >
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-400 rounded-r-full pointer-events-none"/>}

                  {/* Main nav button */}
                  <button
                    onClick={() => {
                      if (item.children) {
                        if (collapsed) { setSidebarOpen(true); setExpanded(p => ({...p,[item.id]:true})); }
                        else setExpanded(p => ({...p,[item.id]:true}));
                      }
                      handleNavClick(item, null);
                    }}
                    title={collapsed ? item.label : undefined}
                    className={`flex-1 flex items-center gap-3 px-3 py-2.5 text-sm font-medium min-w-0
                      ${isActive ? "text-amber-400" : "text-slate-400 hover:text-white"}`}
                  >
                    <Icon d={IC[item.icon]||IC.settings} size={18} className="flex-shrink-0"/>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            {item.badge}
                          </span>
                        )}
                        {/* Permission Badge */}
                        {currentRole !== "system_admin" && permBadge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${permBadge.cls} flex-shrink-0`}>
                            {permBadge.label}
                          </span>
                        )}
                      </>
                    )}
                  </button>

                  {/* Chevron toggle */}
                  {!collapsed && item.children && (
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`flex-shrink-0 px-2.5 py-2.5 rounded-r-xl transition-colors
                        ${isActive ? "text-amber-400/80 hover:text-amber-300" : "text-slate-600 hover:text-slate-300 hover:bg-slate-600/30"}`}
                    >
                      <Icon d={isExpanded ? IC.chevDown : IC.chevRight} size={14}/>
                    </button>
                  )}
                </div>

                {/* Sub-menu */}
                {!collapsed && item.children && isExpanded && (
                  <div className="ml-4 mt-0.5 pl-3 border-l border-slate-700/60 space-y-0.5">
                    {item.children.map(child => (
                      <button key={child.id}
                        onClick={() => handleNavClick(child, item)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150
                          ${activeItem === child.id
                            ? "text-amber-400 bg-amber-500/10"
                            : "text-slate-500 hover:text-slate-300 hover:bg-slate-700/40"}`}
                      >
                        <Icon d={IC[child.icon]||IC.settings} size={13} className="flex-shrink-0"/>
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="px-3 py-3 border-t border-slate-700/60 flex-shrink-0">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-700/50 cursor-pointer transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${roleDef.badge.split(" ")[0]}`}>
                {roleDef.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate">Ramesh</div>
                <div className="text-slate-500 text-[10px] truncate">{roleDef.short}</div>
              </div>
              <Icon d={IC.logout} size={14} className="text-slate-500 hover:text-red-400 transition-colors"/>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Header ──────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-3 flex-shrink-0 z-20">
      <button onClick={() => setSidebarOpen(p => !p)}
        className="hidden md:flex w-9 h-9 rounded-xl items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
        <Icon d={IC.menu} size={20}/>
      </button>
      <button onClick={() => setMobileOpen(p => !p)}
        className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100">
        <Icon d={mobileOpen ? IC.close : IC.menu} size={20}/>
      </button>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm min-w-0">
        {breadcrumbs.map((c,i)=>(
          <span key={i} className="flex items-center gap-1.5">
            {i>0 && <Icon d={IC.chevRight} size={13} className="text-slate-300"/>}
            <span className={i===breadcrumbs.length-1?"text-slate-800 font-semibold":"text-slate-400"}>{c}</span>
          </span>
        ))}
      </nav>

      <div className="flex-1"/>

      {/* 🔀 Role Switcher (Demo) */}
      <div className="relative" ref={roleRef}>
        <button onClick={() => { setRoleSwitcherOpen(p=>!p); setNotifOpen(false); setProfileOpen(false); }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 transition-all text-xs shadow-sm">
          <Icon d={IC.refresh} size={13} className="text-slate-300"/>
          <span className="font-semibold text-slate-200">Switch Role</span>
          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold text-white ${roleDef.badge.split(" ")[0]}`}>{roleDef.short}</span>
          <Icon d={IC.chevDown} size={12} className={`text-slate-400 transition-transform duration-200 ${roleSwitcherOpen ? "rotate-180" : ""}`}/>
        </button>
        {roleSwitcherOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-xs font-bold text-slate-700">Demo — Switch Role</p>
              <p className="text-[10px] text-slate-400 mt-0.5">UI adapts to each role's permissions</p>
            </div>
            <div className="py-1 max-h-72 overflow-y-auto">
              {Object.entries(ROLE_DEFS).map(([key, def]) => (
                <button key={key} onClick={() => handleRoleSwitch(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${currentRole===key?"bg-slate-50":""}`}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${def.badge.split(" ")[0]}`}/>
                  <span className="flex-1 text-left text-slate-700 font-medium text-xs">{def.label}</span>
                  {currentRole===key && <Icon d={IC.check} size={13} className="text-emerald-500"/>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className={`relative flex items-center transition-all duration-300 ${searchFocus?"w-56":"w-36"}`}>
        <Icon d={IC.search} size={14} className="absolute left-3 text-slate-400"/>
        <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
          onFocus={()=>setSearchFocus(true)} onBlur={()=>setSearchFocus(false)}
          placeholder="Search AIMS…"
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all"/>
      </div>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button onClick={()=>{setNotifOpen(p=>!p);setProfileOpen(false);setRoleSwitcherOpen(false);}}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
          <Icon d={IC.bell} size={20}/>
          {unread>0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">{unread}</span>}
        </button>
        {notifOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="font-semibold text-slate-800 text-sm">Notifications</span>
              <span className="text-xs text-amber-600 cursor-pointer hover:underline">Mark all read</span>
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
              {NOTIFICATIONS.map(n=>(
                <div key={n.id} className={`px-4 py-3 hover:bg-slate-50 cursor-pointer ${n.unread?"bg-amber-50/40":""}`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.unread?"bg-amber-500":"bg-transparent border border-slate-300"}`}/>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-800">{n.title}</div>
                      <div className="text-xs text-slate-500 truncate">{n.msg}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{n.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-slate-100 text-center">
              <span className="text-xs text-blue-600 cursor-pointer hover:underline">View all</span>
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative" ref={profileRef}>
        <button onClick={()=>{setProfileOpen(p=>!p);setNotifOpen(false);setRoleSwitcherOpen(false);}}
          className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 transition-colors">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${roleDef.badge.split(" ")[0]}`}>
            {roleDef.initials}
          </div>
          <div className="block text-left">
            <div className="text-xs font-semibold text-slate-800 leading-tight">Ramesh</div>
            <div className="text-[10px] text-slate-400 leading-tight">{roleDef.short}</div>
          </div>
          <Icon d={IC.chevDown} size={13} className="text-slate-400"/>
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
              <div className="font-semibold text-slate-800 text-sm">Ramesh</div>
              <div className="text-xs text-slate-400">rameshmca.eng@gmail.com</div>
              <span className={`mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${roleDef.badge.split(" ")[0]}`}>{roleDef.label}</span>
            </div>
            {[{l:"My Profile",icon:"profile"},{l:"Settings",icon:"settings"},{l:"Activity Log",icon:"activity"}].map(o=>(
              <button key={o.l} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                <Icon d={IC[o.icon]} size={15} className="text-slate-400"/>{o.l}
              </button>
            ))}
            <div className="border-t border-slate-100">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <Icon d={IC.logout} size={15}/>Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  // ── Dashboard Router ─────────────────────────────────────────────────────────
  const renderDashboard = () => {
    if (activeItem !== "dashboard" && activeItem !== "tr-planner") {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-4">
            <Icon d={IC.art} size={32} className="text-amber-600"/>
          </div>
          <h2 className="text-xl font-bold text-slate-800">{activePage}</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-sm">
            This module is part of the AIMS Art Logistics platform. Connect your page components here.
          </p>
          <div className="mt-6 flex gap-3">
            <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">+ Add New</button>
            <button className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 transition-colors">View All Records</button>
          </div>
        </div>
      );
    }
    // Quick actions bar (role-aware)
    const qas = getQuickActions(currentRole);
    const greet = (() => {
      const h = new Date().getHours();
      return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    })();
    return (
      <div className="space-y-5">
        {/* Welcome + Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{greet}, Ramesh 👋</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {roleDef.label} Dashboard · {new Date().toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {qas.map((qa,i)=>(
              <button key={i} className={`${qa.clr} text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all shadow-sm`}>
                <Icon d={IC[qa.icon]||IC.plus} size={13}/>
                {qa.label}
              </button>
            ))}
          </div>
        </div>
        {/* Role-specific dashboard */}
        {currentRole === "system_admin"      && DashSysAdmin()}
        {currentRole === "executive"          && DashExecutive()}
        {currentRole === "projects_manager"   && DashProjectManager()}
        {currentRole === "finance_manager"    && DashFinanceManager()}
        {currentRole === "warehouse_manager"  && DashWarehouseManager()}
        {currentRole === "transport_manager"  && DashTransportManager()}
        {/* All other module managers/users → their primary module dashboard */}
        {!["system_admin","executive","projects_manager","finance_manager","warehouse_manager","transport_manager"].includes(currentRole) && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 ${roleDef.badge}`}>
              <Icon d={IC[roleDef.module||"dashboard"]||IC.activity} size={26} className="text-white"/>
            </div>
            <h2 className="text-lg font-bold text-slate-800">{roleDef.label} Dashboard</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
              Your dedicated {roleDef.module} management dashboard loads here. Connect your module-specific widgets and KPIs.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {getQuickActions(currentRole).map((qa,i)=>(
                <button key={i} className={`${qa.clr} text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 hover:opacity-90`}>
                  <Icon d={IC[qa.icon]||IC.plus} size={13}/>{qa.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Root Render ──────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{fontFamily:"'Inter','Segoe UI',system-ui,sans-serif"}}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden" onClick={()=>setMobileOpen(false)}/>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-40 h-full bg-slate-900 flex-shrink-0 overflow-hidden
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "md:w-64" : "md:w-16"}
        ${mobileOpen  ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {renderSidebar()}
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {renderHeader()}
        <main className="flex-1 flex flex-col overflow-hidden">
          {activeItem === "tr-planner"
            ? <VehicleRunPlannerEmbedded />
            : (
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6">
                  {renderDashboard()}
                </div>
              </div>
            )
          }
        </main>
        <footer className="flex-shrink-0 bg-white border-t border-slate-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-slate-400">
            © {new Date().getFullYear()} <span className="font-semibold text-slate-600">AIMS</span> — Art Integrated Management System
          </span>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>All systems operational
            </span>
            <span>v2.5.0</span>
            <span className="hover:text-slate-600 cursor-pointer">Help</span>
            <span className="hover:text-slate-600 cursor-pointer">Privacy</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
