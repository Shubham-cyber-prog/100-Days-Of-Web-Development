        // DOM elements
        const color1Input = document.getElementById('color1');
        const color2Input = document.getElementById('color2');
        const angleSlider = document.getElementById('angleSlider');
        const angleValue = document.getElementById('angleValue');
        const stopSlider = document.getElementById('stopSlider');
        const stopValue = document.getElementById('stopValue');
        const shadowXSlider = document.getElementById('shadowXSlider');
        const shadowXValue = document.getElementById('shadowXValue');
        const shadowYSlider = document.getElementById('shadowYSlider');
        const shadowYValue = document.getElementById('shadowYValue');
        const blurSlider = document.getElementById('blurSlider');
        const blurValue = document.getElementById('blurValue');
        const opacitySlider = document.getElementById('opacitySlider');
        const opacityValue = document.getElementById('opacityValue');
        const shadowColorInput = document.getElementById('shadowColor');
        const previewElement = document.getElementById('previewElement');
        const previewContainer = document.getElementById('previewContainer');
        const cssOutput = document.getElementById('cssOutput');
        const copyCssBtn = document.getElementById('copyCssBtn');
        const resetBtn = document.getElementById('resetBtn');
        const applyToPreviewBtn = document.getElementById('applyToPreviewBtn');
        const notification = document.getElementById('notification');
        const gradientTypes = document.querySelectorAll('.gradient-type');
        
        // Current gradient type
        let currentGradientType = 'linear';
        
        // Initialize values
        function initializeValues() {
            updateAngleValue();
            updateStopValue();
            updateShadowXValue();
            updateShadowYValue();
            updateBlurValue();
            updateOpacityValue();
            updatePreview();
            updateCssOutput();
        }
        
        // Update slider value displays
        function updateAngleValue() {
            angleValue.textContent = `${angleSlider.value}deg`;
        }
        
        function updateStopValue() {
            stopValue.textContent = `${stopSlider.value}%`;
        }
        
        function updateShadowXValue() {
            shadowXValue.textContent = `${shadowXSlider.value}px`;
        }
        
        function updateShadowYValue() {
            shadowYValue.textContent = `${shadowYSlider.value}px`;
        }
        
        function updateBlurValue() {
            blurValue.textContent = `${blurSlider.value}px`;
        }
        
        function updateOpacityValue() {
            const opacity = (opacitySlider.value / 100).toFixed(2);
            opacityValue.textContent = opacity;
        }
        
        // Generate gradient CSS
        function generateGradient() {
            const color1 = color1Input.value;
            const color2 = color2Input.value;
            const angle = angleSlider.value;
            const stop = stopSlider.value;
            
            switch(currentGradientType) {
                case 'linear':
                    return `linear-gradient(${angle}deg, ${color1} ${stop}%, ${color2})`;
                case 'radial':
                    return `radial-gradient(circle, ${color1} ${stop}%, ${color2})`;
                case 'conic':
                    return `conic-gradient(from ${angle}deg, ${color1}, ${color2})`;
                default:
                    return `linear-gradient(${angle}deg, ${color1} ${stop}%, ${color2})`;
            }
        }
        
        // Generate shadow CSS
        function generateShadow() {
            const x = shadowXSlider.value;
            const y = shadowYSlider.value;
            const blur = blurSlider.value;
            const opacity = (opacitySlider.value / 100).toFixed(2);
            const color = hexToRgba(shadowColorInput.value, opacity);
            
            return `${x}px ${y}px ${blur}px ${color}`;
        }
        
        // Convert hex color to rgba
        function hexToRgba(hex, opacity) {
            // Remove # if present
            hex = hex.replace('#', '');
            
            // Parse r, g, b values
            let r, g, b;
            
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else if (hex.length === 6) {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            } else {
                return 'rgba(0, 0, 0, 0.3)';
            }
            
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        
        // Update preview element
        function updatePreview() {
            const gradient = generateGradient();
            const shadow = generateShadow();
            
            previewElement.style.background = gradient;
            previewElement.style.boxShadow = shadow;
            
            // Also update the container background to show gradient better
            previewContainer.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)';
        }
        
        // Update CSS output
        function updateCssOutput() {
            const gradient = generateGradient();
            const shadow = generateShadow();
            
            const cssCode = `.your-element {
  background: ${gradient};
  box-shadow: ${shadow};
  border-radius: 12px;
  /* Additional properties */
  width: 250px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}`;
            
            cssOutput.textContent = cssCode;
        }
        
        // Copy CSS to clipboard
        function copyCssToClipboard() {
            const cssText = cssOutput.textContent;
            
            navigator.clipboard.writeText(cssText)
                .then(() => {
                    // Show notification
                    notification.classList.add('show');
                    
                    // Hide notification after 3 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 3000);
                })
                .catch(err => {
                    console.error('Failed to copy CSS: ', err);
                    alert('Failed to copy CSS to clipboard. Please try again.');
                });
        }
        
        // Reset all controls to default
        function resetControls() {
            color1Input.value = '#4361ee';
            color2Input.value = '#3a0ca3';
            angleSlider.value = 90;
            stopSlider.value = 50;
            shadowXSlider.value = 10;
            shadowYSlider.value = 10;
            blurSlider.value = 20;
            opacitySlider.value = 30;
            shadowColorInput.value = '#333333';
            
            // Reset gradient type to linear
            gradientTypes.forEach(type => {
                type.classList.remove('active');
                if (type.dataset.type === 'linear') {
                    type.classList.add('active');
                }
            });
            currentGradientType = 'linear';
            
            initializeValues();
        }
        
        // Apply CSS to preview element with animation
        function applyToPreview() {
            previewElement.style.animation = 'none';
            void previewElement.offsetWidth; // Trigger reflow
            previewElement.style.animation = 'pulse 0.5s';
            
            // Remove animation after it completes
            setTimeout(() => {
                previewElement.style.animation = '';
            }, 500);
        }
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        // Event listeners for gradient type selection
        gradientTypes.forEach(type => {
            type.addEventListener('click', () => {
                gradientTypes.forEach(t => t.classList.remove('active'));
                type.classList.add('active');
                currentGradientType = type.dataset.type;
                updatePreview();
                updateCssOutput();
            });
        });
        
        // Event listeners for sliders
        angleSlider.addEventListener('input', () => {
            updateAngleValue();
            updatePreview();
            updateCssOutput();
        });
        
        stopSlider.addEventListener('input', () => {
            updateStopValue();
            updatePreview();
            updateCssOutput();
        });
        
        shadowXSlider.addEventListener('input', () => {
            updateShadowXValue();
            updatePreview();
            updateCssOutput();
        });
        
        shadowYSlider.addEventListener('input', () => {
            updateShadowYValue();
            updatePreview();
            updateCssOutput();
        });
        
        blurSlider.addEventListener('input', () => {
            updateBlurValue();
            updatePreview();
            updateCssOutput();
        });
        
        opacitySlider.addEventListener('input', () => {
            updateOpacityValue();
            updatePreview();
            updateCssOutput();
        });
        
        // Event listeners for color pickers
        color1Input.addEventListener('input', () => {
            updatePreview();
            updateCssOutput();
        });
        
        color2Input.addEventListener('input', () => {
            updatePreview();
            updateCssOutput();
        });
        
        shadowColorInput.addEventListener('input', () => {
            updatePreview();
            updateCssOutput();
        });
        
        // Event listeners for buttons
        copyCssBtn.addEventListener('click', copyCssToClipboard);
        resetBtn.addEventListener('click', resetControls);
        applyToPreviewBtn.addEventListener('click', applyToPreview);
        
        // Initialize the app
        initializeValues();