#!/usr/bin/env python3
"""
Generate Spider-Man moving GIF animation
"""
import subprocess
import sys

# Check if pillow and matplotlib are available
try:
    from PIL import Image, ImageDraw
    print("✓ PIL/Pillow available")
except ImportError:
    print("Installing Pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "-q"])
    from PIL import Image, ImageDraw

width = 1200
height = 600
fps = 30
duration = 5  # seconds
total_frames = fps * duration

frames = []
print("Generating Spider-Man animation frames...")

for frame_num in range(total_frames):
    # Create image
    img = Image.new('RGB', (width, height), color='skyblue')
    draw = ImageDraw.Draw(img)
    
    # Calculate spider position (bouncing left-right)
    position = 0
    speed = 5
    
    for i in range(frame_num):
        position += speed
        if position > width - 100 or position < 0:
            speed = -speed
    
    # Draw spider emoji at calculated position
    # Using text rendering for emoji
    try:
        draw.text((position, 250), '🕷️', fill='black')
    except:
        # Fallback if emoji doesn't work
        draw.text((position, 250), 'SPIDER', fill='black')
    
    # Draw title
    draw.text((20, 20), 'Spider-Man Move', fill='black')
    
    frames.append(img)
    
    if (frame_num + 1) % 30 == 0:
        print(f"  {frame_num + 1}/{total_frames} frames processed")

# Save as GIF
output_file = 'spiderman_animation.gif'
print(f"\nSaving GIF: {output_file}")
frames[0].save(
    output_file,
    save_all=True,
    append_images=frames[1:],
    duration=1000//fps,  # duration in ms
    loop=0  # loop forever
)

print(f"✅ GIF created successfully: {output_file}")
print(f"   Size: {width}x{height}px")
print(f"   Duration: {duration}s ({total_frames} frames @ {fps}fps)")
