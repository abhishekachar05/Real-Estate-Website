import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { userListingsAPI } from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

// ── Constants ─────────────────────────────────────────────────────────────────

const PROPERTY_TYPES = ['Flat', 'House', 'Villa', 'Plot', 'Penthouse', 'Studio', 'Commercial'];
const AVAILABILITY_OPTIONS = ['For Sale', 'For Rent'];
const AMENITIES_LIST = [
  'Parking', 'Swimming Pool', 'Gym', 'Security', 'Power Backup',
  'Lift', 'Garden', 'Club House', 'CCTV', 'Intercom',
  'Rainwater Harvesting', 'Gated Community', 'Children Play Area',
  'Jogging Track', 'Basketball Court',
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  title: string;
  type: string;
  availability: string;
  location: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  description: string;
  phone: string;
  googleMapLink: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const [fetching, setFetching] = useState(true);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [form, setForm] = useState<FormState>({
    title: '',
    type: 'Flat',
    availability: 'For Sale',
    location: '',
    price: '',
    beds: '',
    baths: '',
    sqft: '',
    description: '',
    phone: '',
    googleMapLink: '',
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Auth guard ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('Please sign in to edit a listing.');
      navigate('/signin', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // ── Load existing listing ──────────────────────────────────────────────────

  useEffect(() => {
    if (!id || isLoading) return;
    (async () => {
      try {
        const res = await userListingsAPI.getById(id);
        const p = res.data.property;
        setForm({
          title: p.title ?? '',
          type: p.type ?? 'Flat',
          availability: p.availability ?? 'For Sale',
          location: p.location ?? '',
          price: p.price != null ? String(p.price) : '',
          beds: p.beds != null ? String(p.beds) : '',
          baths: p.baths != null ? String(p.baths) : '',
          sqft: p.sqft != null ? String(p.sqft) : '',
          description: p.description ?? '',
          phone: p.phone ?? '',
          googleMapLink: p.googleMapLink ?? '',
        });
        setAmenities(Array.isArray(p.amenities) ? p.amenities : []);
        setExistingImages(Array.isArray(p.image) ? p.image : []);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to load listing.');
        navigate('/my-listings', { replace: true });
      } finally {
        setFetching(false);
      }
    })();
  }, [id, isLoading, navigate]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 4 - newImages.length;
    if (remaining <= 0) {
      toast.error('Maximum 4 new images allowed.');
      return;
    }
    const allowed = files.slice(0, remaining);
    setNewImages((prev) => [...prev, ...allowed]);
    const previews = allowed.map((f) => URL.createObjectURL(f));
    setNewPreviews((prev) => [...prev, ...previews]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => fd.append(key, val));
    fd.append('amenities', JSON.stringify(amenities));
    newImages.forEach((img) => fd.append('images', img));

    setSubmitting(true);
    try {
      await userListingsAPI.update(id, fd);
      toast.success('Listing updated! It will go live once re-approved by our team.');
      navigate('/my-listings');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update listing. Please try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading states ─────────────────────────────────────────────────────────

  if (isLoading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/my-listings"
            className="inline-flex items-center gap-1.5 font-manrope text-sm text-[#2563EB] hover:text-[#1D4ED8] mb-4 transition-[color]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to My Listings
          </Link>
          <h1 className="font-fraunces text-4xl font-bold text-[#0F172A] mb-2">
            Edit Listing
          </h1>
          <p className="font-manrope text-[#6B7280]">
            Update your property details. Changes will be reviewed by our team before going live again.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic info */}
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-5">
            <h2 className="font-fraunces text-xl font-semibold text-[#0F172A]">Basic Information</h2>

            <div>
              <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Spacious 3 BHK Apartment in Bandra"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] bg-white"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                  Listing For <span className="text-red-500">*</span>
                </label>
                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] bg-white"
                >
                  {AVAILABILITY_OPTIONS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                Full Address / Location <span className="text-red-500">*</span>
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="e.g. 12, MG Road, Bandra West, Mumbai, Maharashtra"
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]"
              />
            </div>
          </section>

          {/* Price & specs */}
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-5">
            <h2 className="font-fraunces text-xl font-semibold text-[#0F172A]">Price &amp; Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                  Price (&#8377;) <span className="text-red-500">*</span>
                </label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required min="1" placeholder="e.g. 8500000"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]" />
              </div>
              <div>
                <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                  Area (sqft) <span className="text-red-500">*</span>
                </label>
                <input name="sqft" type="number" value={form.sqft} onChange={handleChange} required min="1" placeholder="e.g. 1200"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]" />
              </div>
              <div>
                <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                  Bedrooms <span className="text-red-500">*</span>
                </label>
                <input name="beds" type="number" value={form.beds} onChange={handleChange} required min="0" placeholder="e.g. 3"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]" />
              </div>
              <div>
                <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                  Bathrooms <span className="text-red-500">*</span>
                </label>
                <input name="baths" type="number" value={form.baths} onChange={handleChange} required min="0" placeholder="e.g. 2"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]" />
              </div>
            </div>
          </section>

          {/* Description & contact */}
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-5">
            <h2 className="font-fraunces text-xl font-semibold text-[#0F172A]">Description &amp; Contact</h2>
            <div>
              <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
                placeholder="Describe the property — highlights, surroundings, unique features..."
                className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] resize-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98765 43210"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]" />
              </div>
              <div>
                <label className="block font-manrope text-sm font-medium text-[#374151] mb-1">
                  Google Maps Link <span className="text-[#6B7280] font-normal">(optional)</span>
                </label>
                <input name="googleMapLink" value={form.googleMapLink} onChange={handleChange} placeholder="https://maps.google.com/..."
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 font-manrope text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]" />
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <h2 className="font-fraunces text-xl font-semibold text-[#0F172A] mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITIES_LIST.map((amenity) => {
                const checked = amenities.includes(amenity);
                return (
                  <label key={amenity} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-[background-color,border-color] select-none ${checked ? 'border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]' : 'border-[#E2E8F0] text-[#374151] hover:border-[#2563EB]/50'}`}>
                    <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleAmenity(amenity)} />
                    <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${checked ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[#D4CEC8]'}`}>
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="font-manrope text-sm">{amenity}</span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Images */}
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6">
            <h2 className="font-fraunces text-xl font-semibold text-[#0F172A] mb-1">Images</h2>
            <p className="font-manrope text-sm text-[#6B7280] mb-4">
              Current images are kept unless you upload new ones (up to 4). New uploads will replace the existing set.
            </p>

            {existingImages.length > 0 && newImages.length === 0 && (
              <div className="mb-4">
                <p className="font-manrope text-xs font-medium text-[#6B7280] mb-2 uppercase tracking-wide">Current Images</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {existingImages.map((src, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden aspect-square border border-[#E2E8F0]">
                      <img src={src} alt={`Existing ${idx + 1}`} className="w-full h-full object-cover" />
                      {idx === 0 && <span className="absolute bottom-1 left-1 bg-[#2563EB] text-white font-manrope text-xs px-2 py-0.5 rounded">Cover</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {newPreviews.length > 0 && (
              <div className="mb-4">
                <p className="font-manrope text-xs font-medium text-[#6B7280] mb-2 uppercase tracking-wide">New Images (will replace current)</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {newPreviews.map((src, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden aspect-square border border-[#E2E8F0]">
                      <img src={src} alt={`New ${idx + 1}`} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeNewImage(idx)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image">
                        ×
                      </button>
                      {idx === 0 && <span className="absolute bottom-1 left-1 bg-[#2563EB] text-white font-manrope text-xs px-2 py-0.5 rounded">Cover</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {newImages.length < 4 && (
              <button type="button" onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 border-2 border-dashed border-[#2563EB]/40 rounded-lg px-6 py-4 text-[#2563EB] font-manrope text-sm hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-[border-color,background-color]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {newImages.length === 0 ? 'Replace Photos' : `Add More (${newImages.length}/4)`}
              </button>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" multiple className="sr-only" onChange={handleImageChange} />
          </section>

          {/* Re-approval notice */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-manrope text-sm text-amber-800">
              Saving changes will reset your listing to <strong>pending review</strong>. Our team will re-approve it within 24-48 hours.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" disabled={submitting}
              className="flex-1 bg-[#2563EB] text-white font-manrope font-semibold text-base py-3.5 rounded-xl hover:bg-[#1D4ED8] transition-[background-color] disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : 'Save Changes'}
            </button>
            <Link to="/my-listings"
              className="flex-1 text-center border border-[#E2E8F0] text-[#374151] font-manrope font-semibold text-base py-3.5 rounded-xl hover:bg-[#F9FAFB] transition-[background-color]">
              Cancel
            </Link>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditPropertyPage;
