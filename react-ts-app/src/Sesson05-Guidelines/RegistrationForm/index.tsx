import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';

type Gender = 'Male' | 'Female' | 'Other' | '';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: Gender;
  dob: string;
  country: string;
  hobbies: string[];
  profilePic: File | null;
  bio: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  gender: '',
  dob: '',
  country: '',
  hobbies: [],
  profilePic: null,
  bio: '',
};

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm({ ...form, profilePic: file });
    } else if (type === 'checkbox') {
      const { checked, value } = e.target as HTMLInputElement;
      const newHobbies = checked
        ? [...form.hobbies, value]
        : form.hobbies.filter(h => h !== value);
      setForm({ ...form, hobbies: newHobbies });
    } else if (type === 'radio') {
      setForm({ ...form, gender: value as Gender });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const getAge = (dob: string): number => {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const phoneDigits = form.phone.replace(/\D/g, '');

    if (form.fullName.trim().length < 3) newErrors.fullName = 'Full Name must be at least 3 characters.';
    if (!emailPattern.test(form.email)) newErrors.email = 'Invalid email address.';
    if (!passwordPattern.test(form.password)) newErrors.password = 'Password must be at least 8 characters with letters and numbers.';
    if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match.';
    if (phoneDigits.length < 10) newErrors.phone = 'Phone number must be at least 10 digits.';
    if (!form.gender) newErrors.gender = 'Please select a gender.';
    if (!form.dob || getAge(form.dob) < 18) newErrors.dob = 'You must be at least 18 years old.';
    if (!form.country) newErrors.country = 'Please select a country.';
    if (form.hobbies.length === 0) newErrors.hobbies = 'Select at least one hobby.';
    if (form.profilePic && !['image/jpeg', 'image/png', 'image/jpg'].includes(form.profilePic.type)) {
      newErrors.profilePic = 'Invalid file type.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
      setForm(initialFormData);
      setErrors({});
    }
  };

  return (
   <section className="section">
     <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2>User Registration</h2>

      <label>
        Full Name
        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} />
        {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
      </label>

      <label>
        Email
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </label>

      <label>
        Password
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </label>

      <label>
        Confirm Password
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
      </label>

      <label>
        Phone Number
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </label>

      <fieldset>
        <legend>Gender</legend>
        {['Male', 'Female', 'Other'].map(g => (
          <label key={g}>
            <input
              type="radio"
              name="gender"
              value={g}
              checked={form.gender === g}
              onChange={handleChange}
            />
            {g}
          </label>
        ))}
        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
      </fieldset>

      <label>
        Date of Birth
        <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        {errors.dob && <span className={styles.error}>{errors.dob}</span>}
      </label>

      <label>
        Country
        <select name="country" value={form.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option>Vietnam</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
        </select>
        {errors.country && <span className={styles.error}>{errors.country}</span>}
      </label>

      <fieldset>
        <legend>Hobbies</legend>
        {['Reading', 'Traveling', 'Gaming'].map(hobby => (
          <label key={hobby}>
            <input
              type="checkbox"
              name="hobbies"
              value={hobby}
              checked={form.hobbies.includes(hobby)}
              onChange={handleChange}
            />
            {hobby}
          </label>
        ))}
        {errors.hobbies && <span className={styles.error}>{errors.hobbies}</span>}
      </fieldset>

      <label>
        Profile Picture
        <input type="file" name="profilePic" accept=".jpg,.jpeg,.png" onChange={handleChange} />
        {errors.profilePic && <span className={styles.error}>{errors.profilePic}</span>}
      </label>

      <label>
        Bio
        <textarea name="bio" value={form.bio} onChange={handleChange} maxLength={300} />
      </label>

      <button type="submit">Register</button>
    </form>
   </section>
  );
};

export default RegistrationForm;
