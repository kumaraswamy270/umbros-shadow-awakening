
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our anime theme
				umbros: {
					DEFAULT: '#1a0033', // Deep purple
					light: '#3a0066', // Light purple
					dark: '#0f001a', // Darkest purple
					flame: '#3a6aff', // Blue-black flame color
					accent: '#8a2be2', // Vibrant purple accent
				},
				shadow: {
					light: 'rgba(58, 106, 255, 0.2)',
					medium: 'rgba(58, 106, 255, 0.5)',
					heavy: 'rgba(26, 0, 51, 0.8)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'flame-flicker': {
					'0%, 100%': { 
						opacity: '1',
						transform: 'scale(1) rotate(0deg)'
					},
					'25%': { 
						opacity: '0.8',
						transform: 'scale(1.05) rotate(2deg)'
					},
					'50%': { 
						opacity: '0.9',
						transform: 'scale(0.95) rotate(-1deg)'
					},
					'75%': { 
						opacity: '0.7',
						transform: 'scale(1.02) rotate(1deg)'
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px)'
					},
					'50%': { 
						transform: 'translateY(-10px)'
					}
				},
				'pulse-shadow': {
					'0%, 100%': { 
						boxShadow: '0 0 15px 5px rgba(58, 106, 255, 0.4)'
					},
					'50%': { 
						boxShadow: '0 0 25px 10px rgba(58, 106, 255, 0.7)'
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0',
					},
					'100%': { 
						opacity: '1',
					}
				},
				'slide-up': {
					'0%': { 
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flame-flicker': 'flame-flicker 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse-shadow': 'pulse-shadow 4s ease-in-out infinite',
				'fade-in': 'fade-in 1s ease-out forwards',
				'slide-up': 'slide-up 0.7s ease-out forwards',
				'slide-up-delay-1': 'slide-up 0.7s ease-out 0.2s forwards',
				'slide-up-delay-2': 'slide-up 0.7s ease-out 0.4s forwards',
				'slide-up-delay-3': 'slide-up 0.7s ease-out 0.6s forwards',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'village-destroyed': "url('/village-destroyed-bg.png')",
				'sanctum': "url('/obsidian-sanctum-bg.png')",
				'echo-test': "url('/echo-test-bg.png')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
