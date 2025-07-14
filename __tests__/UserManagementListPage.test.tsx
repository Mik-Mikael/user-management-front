import { render, screen } from '@testing-library/react'
import UserManagementPage from '@/app/page'

describe('User Management Page', () => {
  it('renders the page title', () => {
    render(<UserManagementPage />)
    expect(screen.getByText(/User Management/i)).toBeInTheDocument()
  })

  it('renders search and create buttons', () => {
    render(<UserManagementPage />)
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('should render user table rows', () => {
    render(<UserManagementPage />)

    const rows = screen.getAllByRole('row')
    expect(rows.length).toBeGreaterThan(1)
  })
})
