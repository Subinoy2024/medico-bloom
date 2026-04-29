import {
  Heart, Award, Stethoscope, BookOpen, Calendar, Coffee, Brain, Flame,
  Sparkles, GraduationCap, Star, Trophy, Users, PenTool, Target, Lightbulb,
  Sun, Clock, CheckCircle, Eye, BookMarked, Download, Mail, Instagram,
  Twitter, Youtube, Linkedin, MessageCircle, Send, Quote, Home, FileText,
  Settings, Search, TrendingUp, type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  heart: Heart, award: Award, stethoscope: Stethoscope, book: BookOpen,
  calendar: Calendar, coffee: Coffee, brain: Brain, flame: Flame,
  sparkles: Sparkles, graduation: GraduationCap, star: Star, trophy: Trophy,
  users: Users, pen: PenTool, target: Target, lightbulb: Lightbulb, sun: Sun,
  clock: Clock, check: CheckCircle, eye: Eye, bookmark: BookMarked,
  download: Download, mail: Mail, instagram: Instagram, twitter: Twitter,
  youtube: Youtube, linkedin: Linkedin, message: MessageCircle, send: Send,
  quote: Quote, home: Home, file: FileText, settings: Settings, search: Search,
  trending: TrendingUp,
};

export const ICON_KEYS = Object.keys(ICONS);

export const Icon = ({ name, className }: { name?: string; className?: string }) => {
  const Cmp = (name && ICONS[name]) || Sparkles;
  return <Cmp className={className} />;
};
