  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          password_confirm: confirmPassword,
          full_name: fullName,
          role: userType
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setActiveStep(3); // Move to success step
      } else {
        // Handle validation errors
        if (data.email) {
          setError(`Email: ${data.email[0]}`);
        } else if (data.password) {
          setError(`Password: ${data.password[0]}`);
        } else if (data.full_name) {
          setError(`Full name: ${data.full_name[0]}`);
        } else {
          setError(data.detail || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };