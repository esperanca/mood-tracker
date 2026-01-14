import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { STORAGE_KEY } from '$lib/constants.js';

function createMoodStore() {
  const initialData = browser ? JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') : [];
  const { subscribe, set, update } = writable(initialData);

  function persist(data) {
    if (browser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }

  return {
    subscribe,

    addMood: (mood, groups, comment = '') => {
      const entry = {
        id: crypto.randomUUID(),
        mood,
        groups,
        comment,
        timestamp: Date.now()
      };

      update(moods => {
        const updated = [entry, ...moods];
        persist(updated);
        return updated;
      });

      return entry;
    },

    getMoodById: (id, moods) => {
      return moods.find(m => m.id === id);
    },

    getRecentMoods: (moods, limit = 10) => {
      return moods.slice(0, limit);
    },

    getWeeklyMoods: (moods) => {
      const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      return moods.filter(m => m.timestamp >= oneWeekAgo);
    },

    getAverageMood: (moods) => {
      if (moods.length === 0) return 0;
      const sum = moods.reduce((acc, m) => acc + m.mood, 0);
      return sum / moods.length;
    },

    getMoodsByGroup: (moods, groupId) => {
      return moods.filter(m => m.groups.includes(groupId));
    },

    getMoodDistribution: (moods) => {
      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      moods.forEach(m => {
        distribution[m.mood]++;
      });
      return distribution;
    },

    getDailyAverages: (moods, days = 7) => {
      const dailyData = [];
      const now = new Date();

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);

        const dayMoods = moods.filter(m => {
          const moodDate = new Date(m.timestamp);
          return moodDate >= date && moodDate < nextDate;
        });

        const avg = dayMoods.length > 0
          ? dayMoods.reduce((sum, m) => sum + m.mood, 0) / dayMoods.length
          : null;

        dailyData.push({
          date: date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' }),
          average: avg,
          count: dayMoods.length
        });
      }

      return dailyData;
    },

    clearAll: () => {
      set([]);
      persist([]);
    },

    exportJSON: (moods) => {
      const dataStr = JSON.stringify(moods, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mood-tracker-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    },

    exportCSV: (moods) => {
      const headers = ['id', 'mood', 'groups', 'comment', 'timestamp', 'date'];
      const rows = moods.map(m => [
        m.id,
        m.mood,
        m.groups.join(';'),
        `"${(m.comment || '').replace(/"/g, '""')}"`,
        m.timestamp,
        new Date(m.timestamp).toISOString()
      ]);

      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mood-tracker-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };
}

export const moodStore = createMoodStore();
