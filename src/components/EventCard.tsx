import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Event } from "../types";

interface EventCardProps {
  event: Event;
  onViewDetails?: (event: Event) => void;
  showActions?: boolean;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

export function EventCard({ event, onViewDetails, showActions, onEdit, onDelete }: EventCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getLocationIcon = () => {
    switch (event.locationType) {
      case 'online': return '🌐';
      case 'hibrido': return '🔄';
      default: return '📍';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      {event.imageUrl && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="flex-shrink-0">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="line-clamp-2">{event.title}</CardTitle>
          <Badge variant="secondary">{event.category}</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 line-clamp-3">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{getLocationIcon()} {event.location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.targetAudience.join(', ')}</span>
          </div>
        </div>

        <div className="mt-4">
          <Badge variant="outline">{event.campus}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex-shrink-0 gap-2">
        {onViewDetails && (
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewDetails(event)}
          >
            Ver Detalhes
          </Button>
        )}
        
        {showActions && (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit?.(event)}
            >
              Editar
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete?.(event.id)}
            >
              Excluir
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}