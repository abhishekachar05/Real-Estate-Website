import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AIModel from '../models/aiModelModel.js';

dotenv.config({ path: './.env.local' });
dotenv.config();

const MODELS = [
  {
    name: 'Nemotron Super',
    slug: 'nemotron-super',
    modelId: 'nvidia/nemotron-3-super-120b-a12b',
    provider: 'nvidia',
    badge: 'Primary · Reasoning',
    description: 'Primary real estate analysis model.',
    isActive: true,
    isDefault: true,
    order: 0,
    config: {
      maxTokens: 4500,
      timeoutMs: 90000,
      temperature: 0.3,
      topP: 0.95,
      enableThinking: false,
      reasoningBudget: null,
    },
  },
  {
    name: 'Mistral Nemotron',
    slug: 'mistral-nemotron',
    modelId: 'mistralai/mistral-nemotron',
    provider: 'nvidia',
    badge: 'Fallback 1 · Instruction',
    description: 'Instruction-following fallback model.',
    isActive: true,
    isDefault: false,
    order: 1,
    config: {
      maxTokens: 4500,
      timeoutMs: 90000,
      temperature: 0.3,
      topP: 0.95,
      enableThinking: false,
      reasoningBudget: null,
    },
  },
  {
    name: 'Gemma 4 31B IT',
    slug: 'gemma-4-31b-it',
    modelId: 'google/gemma-4-31b-it',
    provider: 'nvidia',
    badge: 'Fallback 2 · Instruction',
    description: 'Instruction-tuned fallback model.',
    isActive: true,
    isDefault: false,
    order: 2,
    config: {
      maxTokens: 4500,
      timeoutMs: 90000,
      temperature: 0.3,
      topP: 0.95,
      enableThinking: false,
      reasoningBudget: null,
    },
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });

  await AIModel.updateMany(
    { $or: [{ provider: 'nvidia' }, { provider: { $exists: false } }] },
    { $set: { isActive: false, isDefault: false } },
  );

  for (const model of MODELS) {
    await AIModel.findOneAndUpdate(
      { slug: model.slug },
      model,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  const active = await AIModel.find({ isActive: true }).sort({ order: 1 }).lean();
  console.log(active.map(model => `${model.order}: ${model.slug} (${model.modelId})`).join('\n'));
  await mongoose.disconnect();
}

run().catch(error => {
  console.error('NVIDIA model configuration failed:', error.message);
  process.exitCode = 1;
});
