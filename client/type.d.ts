interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface MarkHabit {
  habitName: string;
  completed: boolean;
}
interface MoodProps {
  mood: number;
  stress: number;
  sleep: number;
}