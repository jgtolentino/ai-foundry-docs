'use client'

import Link from 'next/link'
import { 
  IconHome, 
  IconChartBar, 
  IconUsers, 
  IconShoppingCart,
  IconBuilding,
  IconMessage,
  IconDatabase,
  IconGitBranch,
  IconReport
} from '@tabler/icons-react'

const navItems = [
  { href: '/', label: 'Overview', icon: IconHome },
  { href: '/analytics', label: 'Analytics', icon: IconChartBar },
  { href: '/customers', label: 'Customers', icon: IconUsers },
  { href: '/products', label: 'Products', icon: IconShoppingCart },
  { href: '/stores', label: 'Stores', icon: IconBuilding },
  { href: '/ask-suqi', label: 'Ask Suqi', icon: IconMessage },
  { href: '/reports', label: 'Reports', icon: IconReport },
  { href: '/data-sources', label: 'Data Sources', icon: IconDatabase },
  { href: '/data-lineage', label: 'Data Lineage', icon: IconGitBranch },
]

export function Navigation() {
  return (
    <aside className="navbar navbar-vertical navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <h1 className="navbar-brand navbar-brand-autodark">
          <a href="/">
            <span className="navbar-brand-image" style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '8px',
              display: 'inline-block'
            }}></span>
            Suqi
          </a>
        </h1>
        
        <div className="collapse navbar-collapse" id="sidebar-menu">
          <ul className="navbar-nav pt-lg-3">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li className="nav-item" key={item.href}>
                  <Link className="nav-link" href={item.href}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <Icon size={20} />
                    </span>
                    <span className="nav-link-title">
                      {item.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </aside>
  )
}