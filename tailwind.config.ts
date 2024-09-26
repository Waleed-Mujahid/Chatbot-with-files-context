import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		animation: {
  			yellowBlob: 'yellow 8s infinite ease',
  			greenBlob: 'green 8s infinite ease',
  			redBlob: 'red 8s infinite linear'
  		},
  		keyframes: {
  			yellow: {
  				'0%': {
  					top: '40vh',
  					left: '20vw',
  					transform: 'scale(1)'
  				},
  				'30%': {
  					top: '30vh',
  					left: '30vw',
  					transform: 'scale(1.2)'
  				},
  				'60%': {
  					top: '20vh',
  					left: '40vw',
  					transform: 'scale(0.7)'
  				},
  				'100%': {
  					top: '40vh',
  					left: '20vw',
  					transform: 'scale(1)'
  				}
  			},
  			green: {
  				'0%': {
  					top: '15vh',
  					right: '20vw',
  					transform: 'scale(1.2)'
  				},
  				'30%': {
  					top: '30vh',
  					right: '30vw',
  					transform: 'scale(0.8)'
  				},
  				'60%': {
  					top: '20vh',
  					right: '40vw',
  					transform: 'scale(1)'
  				},
  				'100%': {
  					top: '15vh',
  					right: '20vw',
  					transform: 'scale(1.2)'
  				}
  			},
  			red: {
  				'0%': {
  					top: '25vh',
  					right: '20vw',
  					transform: 'scale(1)'
  				},
  				'30%': {
  					top: '15vh',
  					right: '45vw',
  					transform: 'scale(1.4)'
  				},
  				'60%': {
  					top: '2vh',
  					right: '25vw',
  					transform: 'scale(0.8)'
  				},
  				'100%': {
  					top: '25vh',
  					right: '20vw',
  					transform: 'scale(1)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
