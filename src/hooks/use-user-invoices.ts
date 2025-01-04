import { useState, useCallback } from 'react';

export function useUserInvoices() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInvoices = useCallback(async (customerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user-invoices?customerId=${customerId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user invoices');
      }

      const result = await response.json();
      setLoading(false);
      return result.data;  // Return the invoices from Stripe
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
      return [];
    }
  }, []);

  return { fetchUserInvoices, loading, error };
}
