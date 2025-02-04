import React, { useState } from 'react';
import cn from 'classnames';

import { Comment } from 'types/Comment';

type Props = {
  onSubmit: (comment: Comment) => Promise<void>;
  isSubmitting: boolean;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasCommentError, setHasCommentError] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value);
    setHasCommentError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasNameError(!name.trim());
    setHasEmailError(!email.trim());
    setHasCommentError(!comment.trim());

    if (!name.trim() || !email.trim() || !comment.trim()) {
      return;
    }

    onSubmit({
      id: 0,
      postId: 0,
      name,
      email,
      body: comment,
    }).then(() => setComment(''));
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setComment('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasCommentError(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': hasNameError })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': hasEmailError })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': hasCommentError })}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        {hasCommentError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isSubmitting })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
