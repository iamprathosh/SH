import torch
from transformers import DebertaV2ForSequenceClassification, DebertaV2Tokenizer

class DeBERTaModel:
    def __init__(self, model_name='microsoft/deberta-v3-large', num_labels=2):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = DebertaV2ForSequenceClassification.from_pretrained(model_name, num_labels=num_labels).to(self.device)
        self.tokenizer = DebertaV2Tokenizer.from_pretrained(model_name)

    def assess(self, resume_text, interview_analysis):
        inputs = self.tokenizer(resume_text, return_tensors='pt', padding=True, truncation=True).to(self.device)
        outputs = self.model(**inputs)
        logits = outputs.logits
        predictions = torch.argmax(logits, dim=-1)
        return predictions.cpu().numpy()

    def fine_tune(self, train_dataset, val_dataset, epochs=3, batch_size=8, learning_rate=2e-5):
        train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
        val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=batch_size, shuffle=False)

        optimizer = torch.optim.AdamW(self.model.parameters(), lr=learning_rate)
        criterion = torch.nn.CrossEntropyLoss()

        for epoch in range(epochs):
            self.model.train()
            total_loss = 0
            for batch in train_loader:
                inputs, labels = batch
                inputs = {key: val.to(self.device) for key, val in inputs.items()}
                labels = labels.to(self.device)

                optimizer.zero_grad()
                outputs = self.model(**inputs)
                loss = criterion(outputs.logits, labels)
                loss.backward()
                optimizer.step()
                total_loss += loss.item()

            avg_train_loss = total_loss / len(train_loader)
            print(f"Epoch {epoch+1}/{epochs}, Training Loss: {avg_train_loss}")

            self.model.eval()
            total_val_loss = 0
            with torch.no_grad():
                for batch in val_loader:
                    inputs, labels = batch
                    inputs = {key: val.to(self.device) for key, val in inputs.items()}
                    labels = labels.to(self.device)

                    outputs = self.model(**inputs)
                    loss = criterion(outputs.logits, labels)
                    total_val_loss += loss.item()

            avg_val_loss = total_val_loss / len(val_loader)
            print(f"Epoch {epoch+1}/{epochs}, Validation Loss: {avg_val_loss}")
