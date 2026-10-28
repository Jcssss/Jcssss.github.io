import React, { useState } from 'react';

const ContactContent = () => {
    const [statusModal, setStatusModal] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        setIsLoading(true);

        try {
            const response = await fetch("https://formspree.io/f/mjyyrqvd", {
                method: "POST",
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setStatusModal({
                    type: 'success',
                    title: 'Message Delivered!',
                    message: "Your message has been successfully sent. I'll get back to you soon."
                });
                form.reset();
            } else {
                setStatusModal({
                    type: 'error',
                    title: 'Transmission Failed',
                    message: "Oops! There was a problem sending your message. Please try again."
                });
            }
        } catch (error) {
            setStatusModal({
                type: 'error',
                title: 'Network Error',
                message: "Unable to reach the server. Please check your connection and try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <form 
                onSubmit={onSubmit}
                className="space-y-4 max-w-lg mx-auto"
            >
                <div>
                    <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Your Name</label>
                    <input 
                        required 
                        type="text" 
                        name="name" 
                        placeholder="Type name here..." 
                        className="input-box-bg w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-rose-500 transition-colors font-medium" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                    <input 
                        required 
                        type="email" 
                        name="email" 
                        placeholder="Full email here..." 
                        className="input-box-bg w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-rose-500 transition-colors font-medium" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Message</label>
                    <textarea 
                        required 
                        rows="3" 
                        name="message" 
                        placeholder="Write your message or inquiry here..." 
                        className="input-box-bg w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-rose-500 transition-colors resize-none font-medium"
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm transition-colors shadow-lg shadow-rose-600/30 flex items-center justify-center disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                            <span>Sending Message...</span>
                        </>
                    ) : (
                        <span>Send</span>
                    )}
                </button>
            </form>

            {/* Custom Themed Popup Modal */}
            {statusModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
                    <div 
                        className="w-full max-w-sm rounded-2xl p-6 border shadow-2xl relative text-center flex flex-col items-center overflow-hidden"
                        style={{ backgroundColor: 'var(--modal-bg)', borderColor: statusModal.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)' }}
                    >
                        {/* Icon badge */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 border ${statusModal.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'}`}>
                            <i className={`fa-solid ${statusModal.type === 'success' ? 'fa-scroll' : 'fa-triangle-exclamation'}`}></i>
                        </div>

                        <h3 className="text-lg font-extrabold mb-2" style={{ color: 'var(--text-main)' }}>
                            {statusModal.title}
                        </h3>

                        <p className="text-xs leading-relaxed mb-6 font-medium" style={{ color: 'var(--text-muted)' }}>
                            {statusModal.message}
                        </p>

                        <button 
                            onClick={() => setStatusModal(null)}
                            className={`w-full py-2.5 rounded-xl text-xs font-extrabold text-white transition-colors shadow-md ${statusModal.type === 'success' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'}`}
                        >
                            Acknowledge
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactContent;