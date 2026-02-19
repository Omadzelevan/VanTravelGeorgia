import { useEffect, useMemo, useState } from "react";
import "../styles/admin.css";

const API_BASE = (import.meta.env.VITE_API_BASE || "/api").replace(/\/+$/, "");
const DEFAULT_ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY || "";

async function apiRequest(path, { method = "GET", body, adminKey } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (adminKey) {
    headers["x-admin-api-key"] = adminKey;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const message = data.message || `Request failed with ${res.status}`;
    throw new Error(message);
  }

  return res.json();
}

const statusOptions = ["pending", "confirmed", "cancelled", "completed"];

export default function Admin() {
  const [adminKey, setAdminKey] = useState(
    () => localStorage.getItem("admin_key") || DEFAULT_ADMIN_KEY
  );
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, limit: 20, total: 0 });
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasKey = useMemo(() => adminKey && adminKey.trim().length > 0, [adminKey]);

  useEffect(() => {
    if (hasKey) {
      localStorage.setItem("admin_key", adminKey);
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey, pagination.page, statusFilter]);

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams();
      if (statusFilter) query.set("status", statusFilter);
      query.set("page", pagination.page);
      query.set("limit", pagination.limit);

      const [bookingsRes, statsRes] = await Promise.all([
        apiRequest(`/bookings?${query.toString()}`, { adminKey }),
        apiRequest("/bookings/stats/summary", { adminKey }),
      ]);

      setBookings(bookingsRes.bookings || []);
      setPagination((prev) => ({
        ...prev,
        pages: bookingsRes.pagination?.pages || 1,
        total: bookingsRes.pagination?.total || 0,
        limit: bookingsRes.pagination?.limit || prev.limit,
      }));
      setStats(statsRes.stats || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    setError("");
    try {
      await apiRequest(`/bookings/${id}/status`, {
        method: "PATCH",
        body: { status },
        adminKey,
      });
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  }

  function nextPage() {
    setPagination((prev) => ({
      ...prev,
      page: Math.min(prev.page + 1, prev.pages),
    }));
  }

  function prevPage() {
    setPagination((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1>Admin Panel</h1>
          <p className="muted">Manage bookings, statuses and metrics</p>
        </div>
        <div className="key-input">
          <label htmlFor="admin-key">Admin API Key</label>
          <input
            id="admin-key"
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Enter admin key"
          />
          {!hasKey && <p className="warning">Provide key to load data</p>}
        </div>
      </header>

      <section className="controls">
        <div className="filters">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={pagination.page <= 1 || loading}>
            ← Prev
          </button>
          <span>
            Page {pagination.page} / {pagination.pages}
          </span>
          <button
            onClick={nextPage}
            disabled={pagination.page >= pagination.pages || loading}
          >
            Next →
          </button>
        </div>
      </section>

      {error && <div className="error-banner">{error}</div>}

      {stats && (
        <section className="stats-grid">
          <div className="stat-card">
            <p className="label">Total bookings</p>
            <p className="value">{stats.total}</p>
          </div>
          <div className="stat-card">
            <p className="label">Total revenue</p>
            <p className="value">${stats.totalRevenue}</p>
          </div>
          {stats.byStatus?.map((item) => (
            <div key={item._id} className="stat-card small">
              <p className="label">{item._id}</p>
              <p className="value">{item.count}</p>
              <p className="sub">${item.totalRevenue}</p>
            </div>
          ))}
        </section>
      )}

      <section className="table-wrapper">
        {loading ? (
          <p className="muted">Loading…</p>
        ) : bookings.length === 0 ? (
          <p className="muted">No bookings found.</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Customer</th>
                <th>Tour</th>
                <th>Date</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.reference}</td>
                  <td>
                    <div>{b.name}</div>
                    <div className="muted small">{b.email}</div>
                  </td>
                  <td>{b.tourTitle}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>{b.guests}</td>
                  <td>${b.totalPrice}</td>
                  <td>
                    <span className={`badge badge-${b.status}`}>{b.status}</span>
                  </td>
                  <td className="actions">
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(b._id, s)}
                        disabled={loading || b.status === s}
                      >
                        {s}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
