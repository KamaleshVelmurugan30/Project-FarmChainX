import { QualityScore } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

interface QualityBadgeProps {
  score: QualityScore;
  size?: 'sm' | 'md' | 'lg';
}

const labelColors: Record<QualityScore['label'], string> = {
  A: 'bg-success text-accent-foreground',
  B: 'bg-farm-green text-primary-foreground',
  C: 'bg-harvest-gold text-soil-dark',
  D: 'bg-warning text-soil-dark',
  F: 'bg-destructive text-destructive-foreground',
};

const sizeStyles = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-2xl',
};

export function QualityBadge({ score, size = 'md' }: QualityBadgeProps) {
  return (
    <div
      className={cn(
        'rounded-full font-bold flex items-center justify-center',
        labelColors[score.label],
        sizeStyles[size]
      )}
    >
      {score.label}
    </div>
  );
}

interface QualityScoreCardProps {
  score: QualityScore;
  showTimeline?: boolean;
  className?: string;
}

export function QualityScoreCard({ score, className }: QualityScoreCardProps) {
  const confidencePercent = Math.round(score.confidence * 100);

  return (
    <Card variant="stat" className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Quality Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <QualityBadge score={score} size="lg" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Confidence</span>
              <span className="text-sm font-bold">{confidencePercent}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', labelColors[score.label])}
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Model: {score.modelVersion}</span>
          <span>{dayjs(score.analyzedAt).format('MMM D, YYYY HH:mm')}</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface QualityTimelineProps {
  scores: QualityScore[];
  className?: string;
}

export function QualityTimeline({ scores, className }: QualityTimelineProps) {
  if (scores.length === 0) {
    return (
      <Card className={cn('p-6 text-center text-muted-foreground', className)}>
        No quality scores yet
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Score History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scores.map((score, index) => (
            <div key={score.id} className="flex items-center gap-4">
              <div className="relative">
                <QualityBadge score={score} size="sm" />
                {index < scores.length - 1 && (
                  <div className="absolute left-1/2 top-full w-0.5 h-6 bg-border -translate-x-1/2" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    Grade {score.label} ({Math.round(score.confidence * 100)}%)
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {score.modelVersion}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {dayjs(score.analyzedAt).format('MMM D, YYYY HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
