input MovAvgWeightedPeriod = 13;
input MovAvgWeightedDistance = 0;
input price = close;
def na = Double.NaN;

plot movAvgWeighted = MovAvgWeighted(price, MovAvgWeightedPeriod, MovAvgWeightedDistance);

def crossover = if close > movAvgWeighted  and close[1] <= movAvgWeighted[1] then 1 else 0;
def crossunder = if close < movAvgWeighted and close[1] >= movAvgWeighted[1] then 1 else 0;

#Plot arrows
plot up = if crossover then low - TickSize() else na;
plot down = if crossunder then high + TickSize() else na;
up.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
down.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);

#Trigger alerts
Alert(crossover[1], "Crossover", Alert.BAR, Sound.Ding);
Alert(crossunder[1], "Crossunder", Alert.BAR, Sound.Ding);
