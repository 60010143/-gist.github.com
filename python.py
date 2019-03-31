import numpy as np
import math
import matplotlib.pyplot as plot

# Get x values of the sine wave

time      = np.arange(0, 144, 0.1);


# Amplitude of the sine wave is sine of a variable like time

amplitude   = np.sin(time)
print(amplitude*100)
# Plot a sine wave using time and amplitude obtained for the sine wave

print('%4f',(list(int(amplitude*100//1)))
plot.plot(time, amplitude*100)


# Give a title for the sine wave plot

plot.title('Sine wave')
# Give x axis label for the sine wave plot
plot.xlabel('Time')
# Give y axis label for the sine wave plot
plot.ylabel('Amplitude = sin(time)')

plot.grid(True, which='both')


plot.axhline(y=0, color='k')
plot.show()

# Display the sine wave

plot.show()