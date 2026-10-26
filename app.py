import streamlit as st
import streamlit.components.v1 as components
import os

# Configure Streamlit page settings
st.set_page_config(
    page_title="Nayan A. Pise | AI/ML Engineer",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Hide Streamlit header, footer and default padding
st.markdown("""
<style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .block-container {
        padding-top: 0rem !important;
        padding-bottom: 0rem !important;
        padding-left: 0rem !important;
        padding-right: 0rem !important;
        max-width: 100% !important;
    }
    iframe {
        border: none;
        width: 100vw !important;
        height: 100vh !important;
        display: block;
    }
</style>
""", unsafe_allow_html=True)

# Read index.html and embed inline
current_dir = os.path.dirname(os.path.abspath(__file__))
html_path = os.path.join(current_dir, "index.html")

if os.path.exists(html_path):
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # Read style.css and script.js to inline them for seamless Streamlit iframe rendering
    css_path = os.path.join(current_dir, "style.css")
    js_path = os.path.join(current_dir, "script.js")
    
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            css_content = f.read()
            html_content = html_content.replace(
                '<link rel="stylesheet" href="style.css" />',
                f'<style>{css_content}</style>'
            )
            
    if os.path.exists(js_path):
        with open(js_path, "r", encoding="utf-8") as f:
            js_content = f.read()
            html_content = html_content.replace(
                '<script src="script.js"></script>',
                f'<script>{js_content}</script>'
            )

    components.html(html_content, height=1200, scrolling=True)
else:
    st.error("index.html not found.")
