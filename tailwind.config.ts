import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'zoom-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-subtle': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                'rotate-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                'pulse-dot': {
                    '0%, 100%': { 
                        transform: 'scale(0.8)',
                        opacity: '0.5' 
                    },
                    '50%': { 
                        transform: 'scale(1.2)',
                        opacity: '1' 
                    }
                },
                'blink': {
                    '0%, 100%': { borderColor: 'transparent' },
                    '50%': { borderColor: 'hsl(var(--primary))' }
                },
                'pulse-ring': {
                    '0%': { transform: 'scale(0.7)', opacity: '0.5' },
                    '50%': { transform: 'scale(1.2)', opacity: '0' },
                    '100%': { transform: 'scale(0.7)', opacity: '0' }
                },
                'shine': {
                    '0%': { transform: 'translateX(-100%) skewX(-20deg)' },
                    '100%': { transform: 'translateX(200%) skewX(-20deg)' }
                },
                'typing': {
                    'from': { width: '0' },
                    'to': { width: '100%' }
                },
                'blink-caret': {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: '#02315b' }
                }
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'zoom-in': 'zoom-in 0.3s ease-out',
                'float': 'float 3s ease-in-out infinite',
                'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
                'rotate-slow': 'rotate-slow 12s linear infinite',
                'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
                'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
                'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shine': 'shine 2s infinite',
                'typing': 'typing 2.5s steps(30, end)',
                'blink-caret': 'blink-caret 0.75s step-end infinite'
			},
			fontFamily: {
				sans: ['Inter', 'Satoshi', 'sans-serif'],
                manrope: ['Manrope', 'sans-serif'],
                satoshi: ['Satoshi', 'sans-serif'],
				heading: ['Manrope', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
