import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import * as UserService from '../../services/UserService';
import { Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Loading } from '../../components/LoadingComponent/Loading';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState('forgot');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const sendOtpMutation = useMutation({
        mutationFn: async (email) => {
            await UserService.sendPasswordResetLink(email);
        },
        onSuccess: () => {
            message.success('OTP sent. Please check your email.');
            setStep('reset');
        },
        onError: () => {
            message.error('Failed to send OTP. Please try again.');
        }
    });

    const resetPasswordMutation = useMutation({
        mutationFn: async ({ email, otp, newPassword }) => {
            await UserService.resetPassword(email, otp, newPassword);
        },
        onSuccess: () => {
            message.success('Password reset successfully. You can now log in with your new password.');
            setStep('forgot');
            setEmail('');
            setOtp('');
            setNewPassword('');
            navigate('/sign-in')
        },
        onError: () => {
            message.error('Failed to reset password. Please try again.');
        }
    });

    const handleSendOtp = () => {
        sendOtpMutation.mutate(email);
    };

    const handleResetPassword = () => {
        resetPasswordMutation.mutate({ email, otp, newPassword });
    };

    return (
        <div style={{ width: '300px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            {step === 'forgot' ? (
                <>
                    <h2>Forgot Password</h2>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Button type="primary" onClick={handleSendOtp} disabled={!email || sendOtpMutation.isLoading}>
                        Send OTP
                    </Button>
                </>
            ) : (
                <>
                    <h2>Reset Password</h2>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input.Password
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ marginBottom: '10px' }}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <Button type="primary" onClick={handleResetPassword} disabled={!email || !otp || !newPassword || resetPasswordMutation.isLoading}>
                        Reset Password
                    </Button>
                </>
            )}
            {(sendOtpMutation.isLoading || resetPasswordMutation.isLoading) && <Loading />}
        </div>
    );
};
