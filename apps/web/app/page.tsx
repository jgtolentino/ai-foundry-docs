'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="page">
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">
                  Suqi Analytics Platform
                </h2>
                <div className="text-muted mt-1">Executive Overview</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Revenue</div>
                    </div>
                    <div className="h1 mb-3">$4,328</div>
                    <div className="d-flex mb-2">
                      <div>Growth rate</div>
                      <div className="ms-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          8% 
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Transactions</div>
                    </div>
                    <div className="h1 mb-3">1,234</div>
                    <div className="d-flex mb-2">
                      <div>Conversion rate</div>
                      <div className="ms-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          4.5%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Active Customers</div>
                    </div>
                    <div className="h1 mb-3">892</div>
                    <div className="d-flex mb-2">
                      <div>Retention</div>
                      <div className="ms-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          89%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-sm-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="subheader">Avg Order Value</div>
                    </div>
                    <div className="h1 mb-3">$82.40</div>
                    <div className="d-flex mb-2">
                      <div>Change</div>
                      <div className="ms-auto">
                        <span className="text-green d-inline-flex align-items-center lh-1">
                          +12%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row row-cards mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Quick Navigation</h3>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <Link href="/analytics" className="btn btn-primary w-100">
                          Analytics Dashboard
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link href="/ask-suqi" className="btn btn-primary w-100">
                          Ask Suqi
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link href="/data-sources" className="btn btn-primary w-100">
                          Data Sources
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}