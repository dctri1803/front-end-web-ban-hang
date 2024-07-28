import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as CommentService from "../../services/CommentService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "../LoadingComponent/Loading";
import { error, success } from '../../components/Message/Message'
import { ActionSpan, AuthorName, CommentActions, CommentAuthor, CommentAvatar, CommentContent, CommentDatetime, CommentWrapper } from "./style";


const { TextArea } = Input;

const CommentComponent = ({ productId }) => {
    const [commentText, setCommentText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const user = useSelector((state) => state.user);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: comments, isPending } = useQuery({
        queryKey: ['comments', productId],
        queryFn: async () => {
            const res = await CommentService.getCommentsByProductId(productId);
            return res.data;
        },
        enabled: !!productId
    });
    
    const addCommentMutation = useMutation({
        mutationFn: async (data) => {
            const res = await CommentService.addComment(data);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', productId]);
        },
        onError: (error) => {
            error("Error adding comment:", error);
        },
    });

    const replyToCommentMutation = useMutation({
        mutationFn: async (data) => {
            const res = await CommentService.replyToComment(data);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', productId]);
        },
        onError: (error) => {
            console.error("Error replying to comment:", error);
        },
    });


    const handleAddComment = () => {
        if (!user?.id) {
            navigate('/sign-in');
        } else {
            addCommentMutation.mutate({
                productId: productId,
                userId: user.id,
                content: commentText
            });
            setCommentText('');
        }
    };

   
    const handleReply = (commentId) => {
        if (!user?.id) {
            navigate('/sign-in');
        } else {
            replyToCommentMutation.mutate({
                productId: productId,
                commentId: commentId,
                userId: user.id,
                content: replyText
            });
            setReplyText('');
            setReplyingTo(null);
        }
    };


    const likeCommentMutation = useMutation({
        mutationFn: async ({ commentId, userId }) => {
            const res = await CommentService.likeComment(commentId, userId);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', productId]);
        },
        onError: (error) => {
            error('Error liking comment:', error);
        }
    });
    
    const dislikeCommentMutation = useMutation({
        mutationFn: async ({ commentId, userId }) => {
            const res = await CommentService.dislikeComment(commentId, userId);
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', productId]);
        },
        onError: (error) => {
            error('Error disliking comment:', error);
        }
    });
    
    const handleLike = (commentId) => {
        likeCommentMutation.mutate({ commentId, userId: user?.id });
    };
    
    const handleDislike = (commentId) => {
        dislikeCommentMutation.mutate({ commentId, userId: user?.id });
    };
    
    return (
        <Loading isPending={isPending}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', marginTop: '16px' }}>
                <Col span={24}>
                    <Form.Item>
                        <TextArea rows={4} onChange={(e) => setCommentText(e.target.value)} value={commentText} />
                    </Form.Item>
                    <Button type="primary" onClick={handleAddComment}>
                        Add Comment
                    </Button>
                </Col>
                <Col span={24}>
                    {comments?.map((comment) => (
                        <CommentWrapper key={comment._id}>
                            <CommentAuthor>
                                <CommentAvatar src={comment.user.avatar} alt={comment.user.name} />
                                <AuthorName>{comment.user.name}</AuthorName>
                                <CommentDatetime>{new Date(comment.createdAt).toLocaleString()}</CommentDatetime>
                            </CommentAuthor>
                            <CommentContent>{comment.content}</CommentContent>
                            <CommentActions>
                                <ActionSpan onClick={() => handleLike(comment._id)}>Like ({comment.likes.length})</ActionSpan>
                                <ActionSpan onClick={() => handleDislike(comment._id)}>Dislike ({comment.dislikes.length})</ActionSpan>
                                <ActionSpan onClick={() => setReplyingTo(comment._id)}>Reply</ActionSpan>
                            </CommentActions>
                            {replyingTo === comment._id && (
                                <div style={{ marginLeft: '24px', marginTop: '8px' }}>
                                    <Form.Item>
                                        <TextArea rows={2} onChange={(e) => setReplyText(e.target.value)} value={replyText} />
                                    </Form.Item>
                                    <Button type="primary" onClick={() => handleReply(comment._id)}>
                                        Reply
                                    </Button>
                                </div>
                            )}
                        </CommentWrapper>
                    ))}
                </Col>
            </Row>
        </Loading>
    );
};

export default CommentComponent;
