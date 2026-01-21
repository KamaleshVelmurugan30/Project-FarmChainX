import { useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '@/store';
import { Alert } from '@/types';
import { toast } from '@/hooks/use-toast';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws';

interface WebSocketMessage {
  type: 'TRANSPORT_UPDATE' | 'QUALITY_SCORE' | 'ALERT' | 'BATCH_UPDATE';
  payload: unknown;
  batchId?: string;
}

export function useWebSocket(batchId?: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const { addAlert } = useAppStore();

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(WS_URL);

      ws.onopen = () => {
        console.log('WebSocket connected');
        if (batchId) {
          ws.send(JSON.stringify({ type: 'SUBSCRIBE', topic: `batch:${batchId}` }));
        }
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          handleMessage(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        // Attempt reconnection after 5 seconds
        reconnectTimeoutRef.current = setTimeout(connect, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }, [batchId]);

  const handleMessage = (message: WebSocketMessage) => {
    switch (message.type) {
      case 'TRANSPORT_UPDATE':
        toast({
          title: '🚚 Transport Update',
          description: `Batch ${message.batchId} location updated`,
        });
        break;
      case 'QUALITY_SCORE':
        toast({
          title: '📊 Quality Score',
          description: `New quality score available for batch ${message.batchId}`,
        });
        break;
      case 'ALERT':
        const alert = message.payload as Alert;
        addAlert(alert);
        toast({
          title: alert.type === 'WARNING' ? '⚠️ Warning' : 'ℹ️ Info',
          description: alert.message,
          variant: alert.type === 'ERROR' ? 'destructive' : 'default',
        });
        break;
      default:
        break;
    }
  };

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Don't auto-connect in demo mode (when backend is unavailable)
    // connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { connect, disconnect, ws: wsRef.current };
}
