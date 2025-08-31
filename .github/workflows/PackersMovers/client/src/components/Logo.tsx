import { Truck } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center" data-testid="logo-swastik">
      {/* Placeholder logo - replace with actual PNG */}
      <div className="bg-primary text-primary-foreground rounded-lg p-2 mr-3">
        <Truck className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Swastik Packers</h1>
        <p className="text-xs text-muted-foreground hidden sm:block">& Movers</p>
      </div>
    </div>
  );
}
