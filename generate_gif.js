const fs = require('fs');

// Check if required packages are available
try {
    const GIFEncoder = require('gif-encoder-2');
    const Canvas = require('canvas');
    
    const width = 1000;
    const height = 600;
    const fps = 30;
    const duration = 5; // 5 seconds
    const totalFrames = fps * duration;
    
    const gif = new GIFEncoder(width, height, 'rgba');
    gif.setRepeat(0);
    gif.setDelay(1000 / fps);
    gif.render();
    
    const stream = fs.createWriteStream('shiva_nadhi_animation.gif');
    gif.pipe(stream);
    
    // Snowflakes data
    const snowflakes = [];
    for (let i = 0; i < 100; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 2 + 1,
            speedX: Math.random() * 1 - 0.5,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    function drawFrame(frameCount) {
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F6FF');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Draw mountain
        ctx.fillStyle = '#F0F8FF';
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.quadraticCurveTo(width / 4, height / 2, width / 2, height / 3);
        ctx.quadraticCurveTo(3 * width / 4, height / 2, width, height);
        ctx.fill();
        ctx.strokeStyle = '#E0E0E0';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Update and draw snowflakes
        snowflakes.forEach(flake => {
            flake.y += flake.speedY;
            flake.x += flake.speedX;
            
            if (flake.y > height) {
                flake.y = -10;
                flake.x = Math.random() * width;
            }
            if (flake.x < 0) flake.x = width;
            if (flake.x > width) flake.x = 0;
            
            ctx.globalAlpha = flake.opacity;
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        
        // Draw Shiva sitting
        drawShiva(ctx, 200, 380);
        
        // Draw Nadhi walking
        const progress = (frameCount % totalFrames) / totalFrames;
        const nadhiX = 100 + progress * 700;
        const walkPhase = ((frameCount % totalFrames) / totalFrames) * 4;
        drawNadhi(ctx, nadhiX, 350, walkPhase);
        
        // Snow on ground
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(0, height - 40, width, 40);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(150, height - 20, 80, 0, Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(width - 150, height - 15, 100, 0, Math.PI);
        ctx.fill();
        
        // Text
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.fillText('🙏 Shiva in Meditation 🙏', 20, 40);
        ctx.font = '16px Arial';
        ctx.fillText('Nadhi walks through the snow', 20, 65);
        
        return canvas;
    }
    
    function drawShiva(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        
        // Body
        ctx.fillStyle = '#FFD7B5';
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Head
        ctx.fillStyle = '#FFD7B5';
        ctx.beginPath();
        ctx.arc(0, -50, 28, 0, Math.PI * 2);
        ctx.fill();
        
        // Hair
        ctx.fillStyle = '#4A4A7A';
        ctx.beginPath();
        ctx.arc(-15, -65, 20, Math.PI / 4, Math.PI * 1.75);
        ctx.arc(15, -65, 20, Math.PI * 0.25, Math.PI * 1.25);
        ctx.fill();
        
        // Third eye
        ctx.fillStyle = '#FF4444';
        ctx.beginPath();
        ctx.arc(0, -52, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-10, -55, 3, 0, Math.PI * 2);
        ctx.arc(10, -55, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Crescent
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -48, 12, 0, Math.PI, true);
        ctx.stroke();
        
        // Arms
        ctx.strokeStyle = '#FFD7B5';
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.moveTo(-30, -10);
        ctx.quadraticCurveTo(-60, 20, -50, 60);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(30, -10);
        ctx.quadraticCurveTo(60, 20, 50, 60);
        ctx.stroke();
        
        // Legs
        ctx.beginPath();
        ctx.moveTo(-20, 30);
        ctx.lineTo(-30, 80);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(20, 30);
        ctx.lineTo(30, 80);
        ctx.stroke();
        
        ctx.restore();
    }
    
    function drawNadhi(ctx, x, y, walkPhase) {
        ctx.save();
        ctx.translate(x, y);
        
        // Head
        ctx.fillStyle = '#FFD7B5';
        ctx.beginPath();
        ctx.arc(0, 0, 25, 0, Math.PI * 2);
        ctx.fill();
        
        // Bindi
        ctx.fillStyle = '#FF6B6B';
        ctx.beginPath();
        ctx.arc(0, -8, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-8, -5, 3, 0, Math.PI * 2);
        ctx.arc(8, -5, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Hair
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(0, -18, 22, Math.PI, Math.PI * 2);
        ctx.fill();
        
        // Body
        ctx.strokeStyle = '#FFD7B5';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(0, 25);
        ctx.lineTo(0, 55);
        ctx.stroke();
        
        const walkSin = Math.sin(walkPhase * Math.PI * 2) * 0.5;
        
        // Arms
        ctx.beginPath();
        ctx.moveTo(-12, 35);
        ctx.quadraticCurveTo(-40 + walkSin * 15, 50, -35, 70);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(12, 35);
        ctx.quadraticCurveTo(40 - walkSin * 15, 50, 35, 70);
        ctx.stroke();
        
        // Legs
        ctx.beginPath();
        ctx.moveTo(-8, 55);
        ctx.lineTo(-8 + walkSin * 20, 95);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(8, 55);
        ctx.lineTo(8 - walkSin * 20, 95);
        ctx.stroke();
        
        ctx.restore();
    }
    
    console.log('Generating GIF animation...');
    
    for (let i = 0; i < totalFrames; i++) {
        const canvas = drawFrame(i);
        gif.addFrame(canvas);
        
        if ((i + 1) % 30 === 0) {
            console.log(`Processed ${i + 1}/${totalFrames} frames`);
        }
    }
    
    gif.finish();
    
    stream.on('finish', () => {
        console.log('✅ GIF created successfully: shiva_nadhi_animation.gif');
        process.exit(0);
    });
    
    stream.on('error', (err) => {
        console.error('❌ Error writing GIF:', err);
        process.exit(1);
    });
    
} catch (err) {
    console.error('Missing dependencies. Install with:');
    console.error('npm install canvas gif-encoder-2');
    process.exit(1);
}
