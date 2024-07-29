type Position = `bottom-left` | `bottom-right`;

interface Branding {
  primaryColor: string;
  accentColor: string;
  textColor: string;
}

export interface ChatbotSettings {
  title: string;
  position: Position;
  branding: Branding;
}
