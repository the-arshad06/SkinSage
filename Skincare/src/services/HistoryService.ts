// src/services/HistoryService.ts

// TODO: Replace this with your actual Backend URL
const API_BASE_URL = 'https://your-api-url.com'; 

export interface HistoryItem {
  id: string;
  date: string;
  content: string;
}

export const HistoryService = {
  /**
   * GET ALL HISTORY
   * Expected Backend Response: HistoryItem[]
   */
  getHistory: async (): Promise<HistoryItem[]> => {
    try {
      // --- [BACKEND INTEGRATION] ---
      /*
      const response = await fetch(`${API_BASE_URL}/history`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch history');
      
      return await response.json();
      */
      // -----------------------------

      return []; // Returns empty list until backend is connected
    } catch (error) {
      console.error('[HistoryService] getHistory Error:', error);
      return [];
    }
  },

  /**
   * ADD NEW ITEM
   * Payload: { content: string }
   * Expected Backend Response: HistoryItem (the created object)
   */
  addHistoryItem: async (content: string): Promise<HistoryItem | null> => {
    try {
      // --- [BACKEND INTEGRATION] ---
      /*
      const response = await fetch(`${API_BASE_URL}/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error('Failed to save item');

      return await response.json();
      */
      // -----------------------------

      return null; // Returns null until backend is connected
    } catch (error) {
      console.error('[HistoryService] addHistoryItem Error:', error);
      return null;
    }
  },

  /**
   * CLEAR HISTORY
   */
  clearHistory: async (): Promise<void> => {
    try {
      // --- [BACKEND INTEGRATION] ---
      /*
      await fetch(`${API_BASE_URL}/history`, {
        method: 'DELETE',
      });
      */
      // -----------------------------
    } catch (error) {
      console.error('[HistoryService] clearHistory Error:', error);
    }
  }
};