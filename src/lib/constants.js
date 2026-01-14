export const GROUPS = [
  { id: 'trabalho', label: 'Trabalho', emoji: '💼' },
  { id: 'familia', label: 'Família', emoji: '👨‍👩‍👧' },
  { id: 'amigos', label: 'Amigos', emoji: '👥' },
  { id: 'academia', label: 'Academia', emoji: '🏋️' },
  { id: 'pets', label: 'Pets', emoji: '🐕' },
  { id: 'saude', label: 'Saúde', emoji: '🏥' },
  { id: 'estudos', label: 'Estudos', emoji: '📚' },
  { id: 'hobbies', label: 'Hobbies', emoji: '🎨' },
  { id: 'relacionamento', label: 'Relacionamento', emoji: '❤️' },
  { id: 'financas', label: 'Finanças', emoji: '💰' },
  { id: 'sono', label: 'Sono', emoji: '😴' },
  { id: 'geral', label: 'Geral', emoji: '🌐' }
];

export const MOODS = [
  { value: 1, emoji: '😞', label: 'Muito mal', color: '#e74c3c' },
  { value: 2, emoji: '😕', label: 'Mal', color: '#e67e22' },
  { value: 3, emoji: '😐', label: 'Neutro', color: '#f1c40f' },
  { value: 4, emoji: '🙂', label: 'Bem', color: '#27ae60' },
  { value: 5, emoji: '😊', label: 'Muito bem', color: '#2ecc71' }
];

export const STORAGE_KEY = 'mood-tracker-data';

export const MAX_GROUPS_PER_ENTRY = 3;
export const MAX_COMMENT_LENGTH = 500;
